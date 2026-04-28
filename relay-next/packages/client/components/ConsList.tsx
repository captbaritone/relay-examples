import { Suspense } from "react";

export type Cons<T> = { value: T; next: Promise<Cons<T> | null> };

type ConsListProps<T> = {
  cons: Cons<T> | null;
  fallback: React.ReactNode;
  children: (value: T) => React.ReactNode;
};

export default async function ConsList<T>({
  cons,
  fallback,
  children,
}: ConsListProps<T>) {
  if (cons == null) return null;
  return (
    <>
      {children(cons.value)}
      <Suspense fallback={fallback}>
        {cons.next.then((next) => (
          <ConsList cons={next} fallback={fallback}>
            {children}
          </ConsList>
        ))}
      </Suspense>
    </>
  );
}
