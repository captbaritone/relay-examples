# Relay with React Server Components

This project uses Relay in a Next.js App Router project with React Server Components. All Relay imports in application code should go through `@/relay/server` — never import `relay-runtime` directly.

## Setup

- **Schema**: `packages/server/schema.graphql`
- **Relay config**: `packages/client/relay.config.json`
- **Relay helpers**: `packages/client/relay/server.ts` (the single entry point for all Relay APIs)
- **Generated artifacts**: `packages/client/app/__generated__/`
- **Regenerate artifacts**: `pnpm --filter client relay`

## Imports

Always import from `@/relay/server`, never from `relay-runtime` directly:

```ts
import {
  graphql,
  fetchQueryServer,
  serverFragment,
  commitMutationAsync,
} from "@/relay/server";
```

## Fetching data in Server Components

Use `fetchQueryServer` in `async` Server Components. The component awaits the query result directly — no hooks needed.

```tsx
// app/page.tsx (Server Component — no "use client")
import { graphql, fetchQueryServer } from "@/relay/server";
import { MyQuery } from "./__generated__/MyQuery.graphql";

export default async function Page() {
  const data = await fetchQueryServer<MyQuery>(
    graphql`
      query MyQuery @throwOnFieldError {
        viewer {
          name
          ...ProfileCard_user
        }
      }
    `,
    {},
  );

  return <div>{data.viewer.name}</div>;
}
```

## Reading fragments in Server Components

Use `serverFragment` to read fragment data. The parent passes a fragment ref as a prop.

```tsx
// app/ProfileCard.tsx (Server Component)
import { graphql, serverFragment } from "@/relay/server";
import { ProfileCard_user$key } from "./__generated__/ProfileCard_user.graphql";

export default async function ProfileCard({
  userRef,
}: {
  userRef: ProfileCard_user$key;
}) {
  const user = await serverFragment(
    graphql`
      fragment ProfileCard_user on User @throwOnFieldError {
        name
        avatarUrl
      }
    `,
    userRef,
  );

  return <span>{user.name}</span>;
}
```

## Mutations via Server Actions

Mutations run in Server Actions (`"use server"` files) using `commitMutationAsync`. Client Components invoke these actions — they never touch Relay directly.

```ts
// app/actions.ts
"use server";

import { commitMutationAsync, graphql } from "@/relay/server";
import { myMutation } from "./__generated__/myMutation.graphql";
import { refresh } from "next/cache";

export async function doSomething(itemId: string): Promise<void> {
  await commitMutationAsync<myMutation>(
    graphql`
      mutation myMutation($itemId: ID!) {
        doSomething(itemId: $itemId) {
          item {
            id
          }
        }
      }
    `,
    { itemId },
  );

  refresh(); // Re-render the current page with fresh server data
}
```

## Client Components

Client Components (`"use client"`) should not use Relay hooks or import Relay. Instead they:

1. Receive server-fetched data as props from Server Components.
2. Call Server Actions (from `actions.ts`) to perform mutations.
3. Use `useActionState` with form actions for form-based mutations.

```tsx
// app/LikeButton.tsx
"use client";

import { useState, useTransition } from "react";
import { likeSomething } from "./actions";

export default function LikeButton({
  itemId,
  initialCount,
}: {
  itemId: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const newCount = await likeSomething(itemId);
          if (newCount != null) setCount(newCount);
        });
      }}
    >
      {count} likes
    </button>
  );
}
```

### Form-based mutations with form actions

For forms that mutate data, use the form `action` prop with a server action. Call `refresh()` in the server action to re-render server components with fresh data:

```tsx
// app/AddCommentForm.tsx
"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { addComment } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "..." : "Add"}
    </button>
  );
}

export default function AddCommentForm({ postId }: { postId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        const content = formData.get("content") as string;
        if (!content?.trim()) return;
        formRef.current?.reset();
        await addComment(postId, content); // Server action calls refresh()
      }}
    >
      <input type="text" name="content" />
      <SubmitButton />
    </form>
  );
}
```

## Component and fragment structure

Any component that consumes more than one GraphQL field should define its own fragment. This includes presentational components — if a component reads `id`, `createdAt`, and `author.name`, it should own a fragment for those fields rather than receiving them as individual props. This ensures each component declares its data dependencies and can be composed via fragment spreads.

The typical pattern is a **server component** that defines a fragment and reads it, passing plain data or fragment refs to children:

```tsx
// app/CommentSection.tsx (Server Component — renders list, delegates form to client)
import { graphql, serverFragment } from "@/relay/server";
import { CommentSection_post$key } from "./__generated__/CommentSection_post.graphql";
import AddCommentForm from "./AddCommentForm";

export default async function CommentSection({
  postRef,
}: {
  postRef: CommentSection_post$key;
}) {
  const post = await serverFragment(
    graphql`
      fragment CommentSection_post on Post @throwOnFieldError {
        id
        comments {
          id
          content
          author {
            name
          }
        }
      }
    `,
    postRef,
  );

  return (
    <div>
      {post.comments.map((c) => (
        <div key={c.id}>
          {c.author.name}: {c.content}
        </div>
      ))}
      <AddCommentForm postId={post.id} />
    </div>
  );
}
```

The parent spreads the child's fragment:

```tsx
// In the parent's fragment:
graphql`
  fragment PostCard_post on Post @throwOnFieldError {
    id
    content
    ...CommentSection_post
  }
`

// In the parent's JSX:
<CommentSection postRef={post} />
```

Keep client components minimal — only the interactive parts (forms, buttons) should be `"use client"`. Render as much as possible on the server.

## Data-driven code splitting (RSC equivalent of `@match`/`@module`)

Use `await import()` to dynamically import variant components when a component has many variants. The server decides which variant to render, and only that variant's client JS is sent to the browser.

```tsx
switch (post.__typename) {
  case "TextPost": {
    const TextPostContent = (await import("./TextPostContent")).default;
    return <TextPostContent postRef={post.TextPostContent_post} />;
  }
  case "ImagePost": {
    const ImagePostContent = (await import("./ImagePostContent")).default;
    return <ImagePostContent postRef={post.ImagePostContent_post} />;
  }
}
```

Each variant statically imports its own client components — the chunk boundary from the dynamic import propagates through. `next/dynamic` is not needed.

**Why this matters:** With static imports, every route's client-reference manifest includes all variant chunks — so the browser downloads them on any page that could render a post, even if only one variant is used. Dynamic imports ensure a variant's chunks are only referenced in the RSC payload when the server actually renders that variant. Turbopack may split large dependencies into separate chunk files regardless of import style, but static imports still cause those chunks to be loaded eagerly on all routes.

## Key rules

- **Every component that consumes non-scalar GraphQL data should define a fragment.**
- **Always use `@throwOnFieldError`** on all queries and fragments (not supported on mutations).
- **Never use `@raw_response_type`** on mutations or queries.
- **Never import `relay-runtime` in app code.** Use `@/relay/server`.
- **Never use `fetchQuery` for mutations.** Use `commitMutationAsync`.
- **Server Components are `async` functions** — they `await` Relay data directly.
- **Client Components don't touch Relay** — they receive data as props and call Server Actions.
- **Keep client components minimal** — only interactive parts (forms, buttons) need `"use client"`. Render lists and display logic on the server.
- **Call `refresh()` from `next/cache`** after mutations that should re-render the page with fresh data.
- **Watch for `relay/unused-fields` lint errors** — this rule is set to `error` and catches over-fetching. See [UNUSED_FIELDS.md](UNUSED_FIELDS.md) for common causes and how to fix them.
