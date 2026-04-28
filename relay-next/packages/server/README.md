# Server

This is a standalone GraphQL server that is intentionally **separate from the Next.js app**. It exists to emulate a setup where the backend is written in a non-JavaScript language (e.g. Python, Go, Rust) and exposes a GraphQL API.

In a real-world project where the server _is_ written in Node.js, we'd recommend skipping the network hop entirely and having React Server Components access the data models directly (e.g. by importing the database layer). The separate server + `fetch` approach shown here is the right pattern when the backend is a different service you communicate with over the network.

## Running

```sh
pnpm dev:server
```

Data is stored in a SQLite database (`data.db` in this directory). Delete it to reset to seed data.
