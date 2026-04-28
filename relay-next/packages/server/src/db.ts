import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "..", "data.db");

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    avatar_url TEXT
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id INTEGER NOT NULL REFERENCES users(id),
    post_type TEXT NOT NULL CHECK(post_type IN ('TEXT', 'IMAGE')),
    content TEXT NOT NULL,
    image_url TEXT,
    image_alt_text TEXT,
    upvote_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE VIRTUAL TABLE IF NOT EXISTS posts_fts USING fts5(
    content,
    content='posts',
    content_rowid='id',
    tokenize='porter'
  );

  -- Triggers to keep FTS index in sync
  CREATE TRIGGER IF NOT EXISTS posts_ai AFTER INSERT ON posts BEGIN
    INSERT INTO posts_fts(rowid, content) VALUES (new.id, new.content);
  END;
  CREATE TRIGGER IF NOT EXISTS posts_ad AFTER DELETE ON posts BEGIN
    INSERT INTO posts_fts(posts_fts, rowid, content) VALUES ('delete', old.id, old.content);
  END;
  CREATE TRIGGER IF NOT EXISTS posts_au AFTER UPDATE ON posts BEGIN
    INSERT INTO posts_fts(posts_fts, rowid, content) VALUES ('delete', old.id, old.content);
    INSERT INTO posts_fts(rowid, content) VALUES (new.id, new.content);
  END;

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL REFERENCES posts(id),
    author_id INTEGER NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Seed data if empty
const userCount = db.prepare<[], { count: number }>("SELECT COUNT(*) as count FROM users").get()!;
if (userCount.count === 0) {
  const insertUser = db.prepare(
    "INSERT INTO users (name, avatar_url) VALUES (?, ?)",
  );
  const insertPost = db.prepare(
    "INSERT INTO posts (author_id, post_type, content, image_url, image_alt_text, upvote_count, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
  );
  const insertComment = db.prepare(
    "INSERT INTO comments (post_id, author_id, content, created_at) VALUES (?, ?, ?, ?)",
  );

  const users = [
    "Alice", "Bob", "Charlie", "Diana", "Eve",
    "Frank", "Grace", "Hank", "Ivy", "Jack",
  ];

  const textPosts = [
    "Just learned about **GraphQL** and **Relay**. Mind blown!",
    "Hot take: *TypeScript* makes JavaScript bearable. Fight me in the comments.",
    "Anyone else feel like CSS Grid changed their life? Here's what I love:\n\n- `grid-template-areas` for layout\n- `auto-fit` with `minmax()` for responsiveness\n- No more float hacks!",
    "Just deployed my first **Next.js** app to production. Feels good!",
    "The difference between `useEffect` and `useLayoutEffect` finally clicked for me.",
    "Why does every project eventually need a monorepo?\n\n1. Shared code between packages\n2. Atomic commits across boundaries\n3. One CI pipeline to rule them all",
    "TIL you can use SQL window functions for pagination. Game changer.\n\n```sql\nSELECT *, ROW_NUMBER() OVER (ORDER BY created_at) FROM posts\n```",
    "React Server Components are the future. **Change my mind.**",
    "Spent 3 hours debugging only to find a missing `await`. Classic.",
    "What's everyone's favorite VS Code extension? Mine is *Vim mode*.",
    "Just read the [Relay docs](https://relay.dev) for the third time. It's starting to make sense.",
    "GraphQL fragments are basically **components for your data layer**.",
    "The best code is the code you don't write.",
    "Just discovered **Grats**. Schema-first GraphQL from TypeScript is incredible.\n\n> Grats lets you write your schema using TypeScript types and JSDoc annotations. No SDL needed.",
    "Does anyone actually understand the React fiber reconciler?",
    "Writing tests is like flossing. Everyone knows they should, few actually do.",
    "**Semantic nullability** in GraphQL is going to be huge.",
    "My terminal setup is finally perfect. Time to change it again.\n\nCurrent stack:\n- **Shell**: zsh + starship\n- **Multiplexer**: tmux\n- **Editor**: neovim",
    "Hot take: most design patterns are just ways to avoid thinking.",
    "If your PR has more than 300 lines, it's not a PR, it's a *project*.",
    "Just learned about **view transitions** in CSS. The web platform is amazing.",
    "The best debugging tool is a good night's sleep.",
    "**Tailwind CSS**: write-only CSS that somehow works great.",
    "Optimistic UI updates make everything feel *10x faster*.",
    "Remember when we used to write jQuery? Pepperidge Farm remembers.",
    "Why do we call it a 'stack' when it's more like a *lasagna*?",
    "Just set up ESLint with 47 plugins. My code is now perfect and ~~unreadable~~ beautiful.",
    "Server components + Relay fragments = **chef's kiss**.",
    "The hardest problem in computer science is *naming things*. The second hardest is cache invalidation.",
    "I love how TypeScript catches bugs at compile time that would have taken hours to debug.\n\n```ts\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n```",
    "**Postgres or SQLite?** For this project, SQLite wins.",
    "Every senior developer's secret: *reading the error message carefully*.",
    "Just learned about connection-based pagination. It's elegant once you get it.\n\n> Connections use cursors instead of offsets, making them stable under insertions and deletions.",
    "The only thing better than writing code is **deleting code**.",
    "Why is `node_modules` always 500MB? Where does it all come from?",
    "Finally understand why Relay requires globally unique IDs.",
    "Code review tip: if you can't explain *why* you wrote it, rewrite it.",
    "Zero-config tools are great until you need to configure them.",
    "I've been coding for 10 years and I still Google `center div CSS`.",
    "Functional programming: making simple things complicated since 1958.",
    "Just migrated from REST to GraphQL. **No regrets.**",
    "The real 10x developer is the one who prevents 10 bugs.",
    "Dark mode isn't a feature, it's a *lifestyle*.",
    "Just realized I've been using `git` wrong for 5 years. Interactive rebase is magic.",
    "WebSockets are cool until you have to handle reconnection logic.",
    "The best architecture is the one your team can understand.",
    "Just found a bug that only reproduces on the third Tuesday of months with 31 days.",
    "I don't always test my code, but when I do, I test in production.",
    "**Three.js** is incredible. I just made a rotating cube and I feel like a wizard.",
    "Accessibility isn't optional. Screen readers exist. **Alt text matters.**",
    "Just deployed a Cloudflare Worker. Serverless is wild.",
    "If your function is longer than your screen, it's doing too much.",
    "The best commit message format: *what* changed and *why*.",
    "Just learned about **CRDTs**. Distributed systems are fascinating and terrifying.",
    "You don't need a framework for a landing page. HTML and CSS are enough.",
    "Type safety is not about catching bugs. It's about making **invalid states unrepresentable**.",
    "TDD is great until your tests are testing the mocks.",
    "Every tool is a hammer if you're determined enough.",
    "GraphQL subscriptions are overkill for 99% of use cases. Just poll.",
    "My favorite design pattern is *'keep it simple'*.",
    "Here's how our **RSC data flow** works:\n\n```mermaid\ngraph TD\n  A[Browser Request] --> B[Server Component]\n  B --> C[fetchQueryServer]\n  C --> D[GraphQL Server]\n  D --> C\n  C --> B\n  B --> E[RSC Payload]\n  E --> F[Browser]\n```",
    "Our **deploy pipeline** visualized:\n\n```mermaid\ngraph LR\n  A[Push to main] --> B[CI Tests]\n  B --> C{Tests Pass?}\n  C -->|Yes| D[Build]\n  C -->|No| E[Notify Author]\n  D --> F[Deploy to Staging]\n  F --> G[Smoke Tests]\n  G --> H[Deploy to Prod]\n```",
  ];

  const imageSeeds = [
    { content: "Check out this sunset from my hike today", seed: "sunset", alt: "Sunset over mountain trail" },
    { content: "My desk setup is finally complete", seed: "desk", alt: "Clean desk with dual monitors" },
    { content: "Found this amazing street art downtown", seed: "streetart", alt: "Colorful mural on brick wall" },
    { content: "Morning coffee and code", seed: "coffee", alt: "Latte next to a laptop" },
    { content: "The view from our new office", seed: "office", alt: "City skyline from high-rise window" },
    { content: "My cat decided to help me code today", seed: "cat", alt: "Cat sitting on keyboard" },
    { content: "Beach day! Taking a break from coding", seed: "beach", alt: "Sandy beach with waves" },
    { content: "Whiteboard session for the new architecture", seed: "whiteboard", alt: "Whiteboard covered in diagrams" },
    { content: "Just finished building this mechanical keyboard", seed: "keyboard", alt: "Custom mechanical keyboard with RGB" },
    { content: "Late night coding vibes", seed: "nightcoding", alt: "Dark room lit by monitor glow" },
    { content: "Hiking in the mountains this weekend", seed: "mountains", alt: "Mountain trail with wildflowers" },
    { content: "Look at this gorgeous library I visited", seed: "library", alt: "Grand library with tall bookshelves" },
    { content: "Sunset from the rooftop", seed: "rooftop", alt: "Warm sunset over city rooftops" },
    { content: "My sourdough starter is alive!", seed: "bread", alt: "Fresh sourdough bread loaf" },
    { content: "Conference swag haul", seed: "conference", alt: "Pile of tech conference stickers and shirts" },
    { content: "Retro computing setup I found at a thrift store", seed: "retro", alt: "Vintage computer with CRT monitor" },
    { content: "The aurora was insane last night", seed: "aurora", alt: "Green and purple northern lights" },
    { content: "Garden is coming along nicely", seed: "garden", alt: "Vegetable garden with tomato plants" },
    { content: "New bike day!", seed: "bike", alt: "Road bike leaning against a railing" },
    { content: "This ramen was absolutely perfect", seed: "ramen", alt: "Bowl of ramen with soft-boiled egg" },
    { content: "Snow day means WFH in style", seed: "snow", alt: "Snowy backyard seen through window" },
    { content: "Picked up some vinyl records this weekend", seed: "vinyl", alt: "Stack of vinyl records" },
    { content: "The fog this morning was surreal", seed: "fog", alt: "Foggy road lined with trees" },
    { content: "Just adopted this little guy", seed: "puppy", alt: "Golden retriever puppy" },
    { content: "Art museum visit for inspiration", seed: "museum", alt: "Modern art installation" },
    { content: "Campfire under the stars", seed: "campfire", alt: "Campfire with starry sky" },
    { content: "Building a treehouse this summer", seed: "treehouse", alt: "Wooden treehouse in a big oak" },
    { content: "The autumn colors are incredible", seed: "autumn", alt: "Trees with red and gold leaves" },
    { content: "Made sushi for the first time!", seed: "sushi", alt: "Homemade sushi rolls on a plate" },
    { content: "Found a great coworking space", seed: "coworking", alt: "Modern coworking space with plants" },
  ];

  const comments = [
    "Welcome to the club!",
    "Wait until you try server components with Relay.",
    "Totally agree with this!",
    "Interesting perspective, thanks for sharing.",
    "Can you share more details?",
    "This is so relatable.",
    "Great post!",
    "I had the same experience.",
    "Nice one!",
    "Couldn't agree more.",
    "This made my day.",
    "Saving this for later.",
    "Haha, so true!",
    "Solid take.",
    "Been there, done that.",
  ];

  const seed = db.transaction(() => {
    for (const name of users) {
      insertUser.run(name, null);
    }

    const baseDate = new Date("2026-01-01T08:00:00Z");

    // Build 100 posts interleaving text and image
    const posts: Array<{
      authorId: number; type: string; content: string;
      imageUrl: string | null; imageAlt: string | null;
      upvotes: number; date: Date;
    }> = [];

    let textIdx = 0;
    let imageIdx = 0;
    for (let i = 0; i < 100; i++) {
      const authorId = (i % users.length) + 1;
      const upvotes = Math.floor(Math.random() * 50);
      const date = new Date(baseDate.getTime() + i * 6 * 60 * 60 * 1000);

      if (imageIdx < imageSeeds.length && (i % 4 === 1 || textIdx >= textPosts.length)) {
        const img = imageSeeds[imageIdx++];
        posts.push({
          authorId, type: "IMAGE", content: img.content,
          imageUrl: `https://picsum.photos/seed/${img.seed}/800/600`,
          imageAlt: img.alt, upvotes, date,
        });
      } else {
        posts.push({
          authorId, type: "TEXT",
          content: textPosts[textIdx % textPosts.length],
          imageUrl: null, imageAlt: null, upvotes, date,
        });
        textIdx++;
      }
    }

    // Insert all posts
    for (const p of posts) {
      insertPost.run(
        p.authorId, p.type, p.content,
        p.imageUrl, p.imageAlt, p.upvotes,
        p.date.toISOString(),
      );
    }

    // Insert comments on ~60% of posts
    for (let i = 0; i < posts.length; i++) {
      if ((i * 7 + 3) % 10 < 6) { // deterministic ~60%
        const numComments = (i % 3) + 1;
        for (let c = 0; c < numComments; c++) {
          const commentAuthor = ((posts[i].authorId + c) % users.length) + 1;
          const commentDate = new Date(posts[i].date.getTime() + (c + 1) * 30 * 60 * 1000);
          insertComment.run(
            i + 1, commentAuthor,
            comments[(i * 3 + c) % comments.length],
            commentDate.toISOString(),
          );
        }
      }
    }
  });
  seed();

  // Rebuild FTS index from seed data (triggers only fire on future inserts)
  db.exec("INSERT INTO posts_fts(posts_fts) VALUES ('rebuild')");
}

export default db;
