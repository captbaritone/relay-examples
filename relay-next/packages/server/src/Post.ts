import { ID, Int } from "grats";
import db from "./db.js";
import { GqlNode, nodeId, parseNodeId } from "./node.js";
import { Connection, StreamableConnection, Edge } from "./connection.js";
import { PostRow, UserRow, CommentRow } from "./types.js";
import { User } from "./User.js";
import { Comment } from "./Comment.js";
import { publishUpvote, onUpvote } from "./pubsub.js";

/** @gqlType */
export type CreatePostPayload = {
  /** @gqlField */
  post: Post | null;
};

/** @gqlType */
export type UpvotePostPayload = {
  /** @gqlField */
  post: Post | null;
};

/** @gqlInterface */
export interface Post extends GqlNode {
  /** @gqlField @killsParentOnException */
  id: ID;
  /** @gqlField */
  content: string;
  /** @gqlField */
  upvoteCount: Int;
  /** @gqlField */
  createdAt: string;
}

/** @gqlField */
export function comments(post: Post): Connection<Comment> {
  const dbId = parseNodeId(post.id);
  const rows = db
    .prepare<
      [number],
      CommentRow
    >("SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC")
    .all(dbId);
  const count = db
    .prepare<
      [number],
      { count: number }
    >("SELECT COUNT(*) as count FROM comments WHERE post_id = ?")
    .get(dbId)!;
  return {
    edges: rows.map((r) => ({
      node: new Comment(r),
      cursor: String(r.id),
    })),
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: rows.length > 0 ? String(rows[0].id) : null,
      endCursor: rows.length > 0 ? String(rows[rows.length - 1].id) : null,
    },
    totalCount: count.count,
  };
}

/** @gqlField */
export function posts(user: User): Post[] {
  const dbId = parseNodeId(user.id);
  return db
    .prepare<[number], PostRow>(
      "SELECT * FROM posts WHERE author_id = ? ORDER BY created_at DESC",
    )
    .all(dbId)
    .map((r) => postFromRow(r));
}

export function postFromRow(row: PostRow): Post {
  return row.post_type === "IMAGE" ? new ImagePost(row) : new TextPost(row);
}

/** @gqlField */
export function author(post: Post): User {
  const dbId = parseNodeId(post.id);
  const authorId = db
    .prepare<
      [number],
      { author_id: number }
    >("SELECT author_id FROM posts WHERE id = ?")
    .get(dbId)!;
  const row = db
    .prepare<[number], UserRow>("SELECT * FROM users WHERE id = ?")
    .get(authorId.author_id)!;
  return new User(row);
}

/** @gqlType */
export class TextPost implements Post, GqlNode {
  __typename = "TextPost" as const;

  /** @gqlField @killsParentOnException */
  id: ID;
  /** @gqlField */
  content: string;
  /** @gqlField */
  upvoteCount: Int;
  /** @gqlField */
  createdAt: string;

  constructor(row: PostRow) {
    this.id = nodeId("post", row.id);
    this.content = row.content;
    this.upvoteCount = row.upvote_count;
    this.createdAt = row.created_at;
  }
}

function paginateRows(
  allRows: PostRow[],
  after?: string | null,
  first?: Int | null,
): Connection<Post> {
  let startIndex = 0;
  if (after) {
    const afterIndex = allRows.findIndex((r) => String(r.id) === after);
    if (afterIndex >= 0) startIndex = afterIndex + 1;
  }

  const sliced =
    first != null
      ? allRows.slice(startIndex, startIndex + first)
      : allRows.slice(startIndex);

  return {
    pageInfo: {
      hasNextPage: startIndex + sliced.length < allRows.length,
      hasPreviousPage: startIndex > 0,
      startCursor: sliced.length > 0 ? String(sliced[0].id) : null,
      endCursor:
        sliced.length > 0 ? String(sliced[sliced.length - 1].id) : null,
    },
    edges: sliced.map((r) => ({
      node: postFromRow(r),
      cursor: String(r.id),
    })),
    totalCount: allRows.length,
  };
}

/**
 * An algorithmically curated feed of posts. Results are ranked by a
 * computationally expensive algorithm, so edges may resolve incrementally.
 * Clients can use `@stream` on the `edges` field to receive posts as
 * they become available rather than waiting for the full set.
 * @gqlQueryField
 */
export function forYou(
  after?: string | null,
  first?: Int | null,
  before?: string | null,
  last?: Int | null,
): StreamableConnection<Post> {
  void before;
  void last;
  const allRows = db
    .prepare<[], PostRow>("SELECT * FROM posts ORDER BY created_at DESC")
    .all();

  // Shuffle deterministically based on current hour (changes every hour)
  const hour = Math.floor(Date.now() / 3600000);
  const shuffled = allRows
    .map((row, i) => ({ row, sort: (i * 2654435761 + hour) >>> 0 }))
    .sort((a, b) => a.sort - b.sort)
    .map((x) => x.row);

  let startIndex = 0;
  if (after) {
    const afterIndex = shuffled.findIndex((r) => String(r.id) === after);
    if (afterIndex >= 0) startIndex = afterIndex + 1;
  }
  const limit = first ?? 20;
  const selected = shuffled.slice(startIndex, startIndex + limit);

  async function* streamEdges(): AsyncIterable<Edge<Post>> {
    for (let i = 0; i < selected.length; i++) {
      // Simulate ranking computation delay
      await new Promise((resolve) => setTimeout(resolve, 750));
      yield {
        node: postFromRow(selected[i]),
        cursor: String(selected[i].id),
      };
    }
  }

  return {
    edges: streamEdges(),
    pageInfo: {
      hasNextPage: startIndex + selected.length < shuffled.length,
      hasPreviousPage: startIndex > 0,
      startCursor: selected.length > 0 ? String(selected[0].id) : null,
      endCursor:
        selected.length > 0 ? String(selected[selected.length - 1].id) : null,
    },
    totalCount: shuffled.length,
  };
}

/** @gqlQueryField */
export function allPosts(
  after?: string | null,
  first?: Int | null,
  before?: string | null,
  last?: Int | null,
): Connection<Post> {
  void before;
  void last;
  const rows = db
    .prepare<[], PostRow>("SELECT * FROM posts ORDER BY created_at DESC")
    .all();
  return paginateRows(rows, after, first);
}

/** @gqlQueryField */
export function post(id: ID): Post | null {
  const row = db
    .prepare<[number], PostRow>("SELECT * FROM posts WHERE id = ?")
    .get(parseNodeId(id));
  return row ? postFromRow(row) : null;
}

/** @gqlQueryField */
export function searchPosts(
  query: string,
  after?: string | null,
  first?: Int | null,
): Connection<Post> {
  // Escape quotes, wrap each word, append * for prefix matching
  const escaped = query.replace(/"/g, '""');
  const prefixQuery = escaped
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => `"${word}"*`)
    .join(" ");
  const rows = db
    .prepare<
      [string],
      PostRow
    >("SELECT posts.* FROM posts_fts JOIN posts ON posts.id = posts_fts.rowid WHERE posts_fts MATCH ? ORDER BY rank")
    .all(prefixQuery);
  return paginateRows(rows, after, first);
}

/** @gqlMutationField */
export function createPost(
  content: string,
  authorId: ID,
  imageUrl?: string | null,
  imageAltText?: string | null,
): CreatePostPayload {
  const dbAuthorId = parseNodeId(authorId);
  const userRow = db
    .prepare<[number], UserRow>("SELECT * FROM users WHERE id = ?")
    .get(dbAuthorId);
  if (!userRow) return { post: null };

  const postType = imageUrl ? "IMAGE" : "TEXT";
  const now = new Date().toISOString();
  const result = db
    .prepare(
      "INSERT INTO posts (author_id, post_type, content, image_url, image_alt_text, upvote_count, created_at) VALUES (?, ?, ?, ?, ?, 0, ?)",
    )
    .run(
      dbAuthorId,
      postType,
      content,
      imageUrl ?? null,
      imageAltText ?? null,
      now,
    );

  const row = db
    .prepare<[number | bigint], PostRow>("SELECT * FROM posts WHERE id = ?")
    .get(result.lastInsertRowid)!;
  return { post: postFromRow(row) };
}

/** @gqlMutationField */
export function upvotePost(postId: ID): UpvotePostPayload {
  const dbId = parseNodeId(postId);
  db.prepare(
    "UPDATE posts SET upvote_count = upvote_count + 1 WHERE id = ?",
  ).run(dbId);
  const row = db
    .prepare<[number], PostRow>("SELECT * FROM posts WHERE id = ?")
    .get(dbId);
  publishUpvote(postId);
  return { post: row ? postFromRow(row) : null };
}

/** @gqlSubscriptionField */
export async function* postUpvoteCountChanged(
  postId: ID,
): AsyncIterable<Post | null> {
  // Yield the current state immediately
  const initial = db
    .prepare<[number], PostRow>("SELECT * FROM posts WHERE id = ?")
    .get(parseNodeId(postId));
  yield initial ? postFromRow(initial) : null;

  // Then yield on each upvote
  for await (const _ of onUpvote(postId)) {
    const row = db
      .prepare<[number], PostRow>("SELECT * FROM posts WHERE id = ?")
      .get(parseNodeId(postId));
    yield row ? postFromRow(row) : null;
  }
}

/** @gqlType */
export class ImagePost implements Post, GqlNode {
  __typename = "ImagePost" as const;

  /** @gqlField @killsParentOnException */
  id: ID;
  /** @gqlField */
  content: string;
  /** @gqlField */
  imageUrl: string;
  /** @gqlField */
  imageAltText: string | null;
  /** @gqlField */
  upvoteCount: Int;
  /** @gqlField */
  createdAt: string;

  constructor(row: PostRow) {
    this.id = nodeId("post", row.id);
    this.content = row.content;
    this.imageUrl = row.image_url!;
    this.imageAltText = row.image_alt_text;
    this.upvoteCount = row.upvote_count;
    this.createdAt = row.created_at;
  }
}
