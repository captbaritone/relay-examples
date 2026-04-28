import Link from "next/link";
import { graphql, fetchQueryServer } from "@/relay/server";
import { HeaderQuery } from "./__generated__/HeaderQuery.graphql";
import UserAvatar from "./UserAvatar";

export default async function Header() {
  const data = await fetchQueryServer<HeaderQuery>(
    graphql`
      query HeaderQuery @throwOnFieldError {
        me {
          id
          ...UserAvatar_user
        }
      }
    `,
    {},
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-card-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center px-4 py-2.5">
        <Link href="/" className="text-lg italic text-accent">
          The Community Feed
        </Link>
        <div className="flex-1" />
        <nav className="flex items-center gap-1">
          <Link
            href="/search"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-card-border/40 text-muted transition-colors hover:bg-card-border hover:text-foreground active:scale-90"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </Link>
          <Link href={`/user/${data.me.id}`} className="transition-opacity hover:opacity-80 active:scale-90">
            <UserAvatar userRef={data.me} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
