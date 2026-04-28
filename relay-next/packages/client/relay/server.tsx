import { getEnvironment } from "@/relay/Environment";
import {
  commitMutation,
  fetchQuery,
  graphql,
  GraphQLTaggedNode,
  MutationParameters,
  Observable,
  OperationType,
} from "relay-runtime";
import { observeFragment } from "relay-runtime/experimental";
import { waitForFragmentData } from "relay-runtime/experimental";
// @ts-expect-error internal relay module
import { getFragment } from "relay-runtime/lib/query/GraphQLTag";
import { getSelector } from "relay-runtime/lib/store/RelayModernSelector";
import { getObservableForActiveRequest } from "relay-runtime/lib/query/fetchQueryInternal";
import { KeyType, KeyTypeData } from "relay-runtime/lib/store/FragmentTypes";
import ConsList, { Cons } from "@/components/ConsList";

export { graphql };

export function commitMutationAsync<T extends MutationParameters>(
  mutation: GraphQLTaggedNode,
  variables: T["variables"],
): Promise<T["response"]> {
  return new Promise((resolve, reject) => {
    commitMutation<T>(getEnvironment(), {
      mutation,
      variables,
      onCompleted: (response) => resolve(response),
      onError: (error) => reject(error),
    });
  });
}

export function fetchQueryServer<T extends OperationType>(
  query: GraphQLTaggedNode,
  variables: T["variables"],
): Promise<T["response"]> {
  const observable = fetchQuery<T>(getEnvironment(), query, variables);
  return new Promise((resolve, reject) => {
    observable.subscribe({
      next: (data) => resolve(data),
      error: (err: Error) => reject(err),
    });
  });
}

export async function serverFragment<TKey extends KeyType>(
  fragmentInput: GraphQLTaggedNode,
  fragmentRef: TKey,
): Promise<KeyTypeData<TKey>> {
  return await waitForFragmentData<TKey>(
    getEnvironment(),
    fragmentInput,
    fragmentRef,
  );
}

/**
 * Like `observeFragment` from relay-runtime/experimental, but the returned
 * observable completes when the parent operation's network request finishes
 * (all @defer/@stream payloads delivered). The standard `observeFragment`
 * never completes — it stays open for future store updates.
 */
export function observeFragmentUntilComplete<TKey extends KeyType>(
  fragmentInput: GraphQLTaggedNode,
  fragmentRef: TKey,
): Observable<
  | { state: "ok"; value: KeyTypeData<TKey> }
  | { state: "loading" }
  | { state: "error"; error: Error }
> {
  const fragmentNode = getFragment(fragmentInput);
  const selector = getSelector(fragmentNode, fragmentRef);

  const owner =
    selector?.kind === "SingularReaderSelector"
      ? selector.owner
      : selector?.selectors[0]?.owner;

  const activeObservable = owner
    ? getObservableForActiveRequest(getEnvironment(), owner)
    : null;

  return Observable.create((sink) => {
    // Forward all fragment updates
    const fragmentSub = observeFragment(
      getEnvironment(),
      fragmentInput,
      fragmentRef,
    ).subscribe({
      next: (val: any) => sink.next(val),
      error: (err: Error) => sink.error(err),
    });

    if (activeObservable) {
      // Complete when the owner request finishes
      const requestSub = activeObservable.subscribe({
        complete: () => {
          sink.complete();
        },
        error: (err: Error) => sink.error(err),
      });
      return () => {
        fragmentSub.unsubscribe();
        requestSub.unsubscribe();
      };
    } else {
      // Owner request already complete
      sink.complete();
      return () => {
        fragmentSub.unsubscribe();
      };
    }
  });
}

async function getCons<T, TKey extends KeyType>(
  fragmentInput: GraphQLTaggedNode,
  forYouRef: TKey,
  getStreamField: (data: KeyTypeData<TKey>) => ReadonlyArray<T>,
  offset: number = 0,
): Promise<Cons<ReadonlyArray<T>> | null> {
  const observable = observeFragmentUntilComplete(fragmentInput, forYouRef);
  const data = await filter(observable, (result) => {
    return (
      result.state === "ok" && getStreamField(result.value).length > offset
    );
  }).toPromise();
  if (!data) {
    return null;
  }

  if (data.state !== "ok") {
    throw new Error("Unexpected fragment state: " + data.state);
  }

  const streamField = getStreamField(data.value);

  return {
    value: streamField.slice(offset),
    next: getCons(fragmentInput, forYouRef, getStreamField, streamField.length),
  };
}

export async function StreamList<T, TKey extends KeyType>({
  fragmentInput,
  fragmentRef,
  getStreamField,
  renderItem,
  loadingFallback,
}: {
  fragmentInput: GraphQLTaggedNode;
  fragmentRef: TKey;
  getStreamField: (data: KeyTypeData<TKey>) => ReadonlyArray<T>;
  renderItem: (item: T) => React.ReactNode;
  loadingFallback: React.ReactNode;
}) {
  const cons = await getCons(fragmentInput, fragmentRef, getStreamField);
  return (
    <ConsList cons={cons} fallback={loadingFallback}>
      {(items) => items.map((item) => renderItem(item))}
    </ConsList>
  );
}

function filter<T>(
  observable: Observable<T>,
  predicate: (value: T) => boolean,
): Observable<T> {
  return Observable.create((observer) => {
    return observable.subscribe({
      next(value) {
        if (predicate(value)) {
          observer.next(value);
        }
      },
      error(error: any) {
        observer.error(error);
      },
      complete() {
        observer.complete();
      },
    });
  });
}
