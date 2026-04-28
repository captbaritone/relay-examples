import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { useDeferStream } from "@graphql-yoga/plugin-defer-stream";
import { getSchema } from "./__generated__/schema.js";

const schema = getSchema();
const yoga = createYoga({ schema, plugins: [useDeferStream()] });
const server = createServer(yoga);

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
});
