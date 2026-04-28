import { EventEmitter } from "node:events";

const emitter = new EventEmitter();

// Allow many concurrent subscriptions
emitter.setMaxListeners(0);

export function publishUpvote(postId: string): void {
  emitter.emit(`upvote:${postId}`);
}

export async function* onUpvote(postId: string): AsyncIterable<void> {
  const queue: void[] = [];
  let resolve: (() => void) | null = null;

  const handler = () => {
    if (resolve) {
      const r = resolve;
      resolve = null;
      r();
    } else {
      queue.push();
    }
  };

  emitter.on(`upvote:${postId}`, handler);
  try {
    while (true) {
      if (queue.length > 0) {
        queue.shift();
        yield;
      } else {
        await new Promise<void>((r) => {
          resolve = r;
        });
        yield;
      }
    }
  } finally {
    emitter.off(`upvote:${postId}`, handler);
  }
}
