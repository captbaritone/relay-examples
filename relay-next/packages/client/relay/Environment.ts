import { cache } from "react";
import {
  Environment,
  Network,
  FetchFunction,
  Observable,
  GraphQLResponse,
} from "relay-runtime";

const HTTP_ENDPOINT = "http://localhost:4000/graphql";

const fetchGraphQL: FetchFunction = (request, variables) => {
  return Observable.create((sink) => {
    (async () => {
      const resp = await fetch(HTTP_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "multipart/mixed; deferSpec=20220824, application/json",
        },
        body: JSON.stringify({ query: request.text, variables }),
      });

      if (!resp.ok) {
        sink.error(new Error("Response failed."));
        return;
      }

      const contentType = resp.headers.get("content-type") || "";

      if (contentType.includes("multipart/mixed")) {
        // Yoga uses boundary="-" so the delimiter is \r\n---
        const reader = resp.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (value) buffer += decoder.decode(value, { stream: true });

          // Each part is separated by \r\n---
          const parts = buffer.split("\r\n---");
          // Keep the last segment (may be incomplete)
          buffer = parts.pop() || "";

          for (const part of parts) {
            // The JSON payload comes after headers (double \r\n)
            const headerEnd = part.indexOf("\r\n\r\n");
            if (headerEnd === -1) continue;
            const jsonStr = part.slice(headerEnd + 4).trim();
            if (!jsonStr || jsonStr === "--") continue;
            try {
              const json = JSON.parse(jsonStr);
              // The server sends incremental payloads in the new spec format:
              //   { incremental: [{data, path, label}], hasNext }
              // Relay expects the old format where each chunk has top-level
              // label, path, and data. Unwrap the incremental array.
              if (json.incremental) {
                for (const entry of json.incremental) {
                  if (entry.items) {
                    // @stream: each item in the array is a separate list element.
                    // Relay expects one emission per item with `data` and the
                    // path pointing to the specific array index.
                    for (let i = 0; i < entry.items.length; i++) {
                      sink.next({
                        data: entry.items[i],
                        path: entry.path,
                        label: entry.label,
                        extensions: json.extensions,
                        hasNext: json.hasNext,
                      } as GraphQLResponse);
                    }
                  } else {
                    // @defer: emit as-is with top-level data/path/label
                    sink.next({
                      ...entry,
                      extensions: json.extensions,
                      hasNext: json.hasNext,
                    } as GraphQLResponse);
                  }
                }
              } else if (json.data !== undefined) {
                sink.next(json as GraphQLResponse);
              }
              // Skip payloads with only hasNext (e.g. final {hasNext: false})
            } catch {
              // skip non-JSON parts (e.g. closing boundary)
            }
          }

          if (done) break;
        }

        sink.complete();
      } else {
        // Standard JSON response
        const json = await resp.json();
        sink.next(json);
        sink.complete();
      }
    })().catch((err) => sink.error(err));
  });
};

export const getEnvironment = cache(() => {
  return new Environment({
    network: Network.create(fetchGraphQL),
  });
});
