import { ID } from "grats";
import db from "./db.js";
import { PostRow, UserRow, CommentRow } from "./types.js";
import { postFromRow } from "./Post.js";
import { User } from "./User.js";
import { Comment } from "./Comment.js";

/** @gqlInterface Node */
export interface GqlNode {
  /**
   * @gqlField
   * @killsParentOnException
   */
  id: ID;
}

export function nodeId(prefix: string, dbId: number): string {
  return `${prefix}:${dbId}`;
}

export function parseNodeId(globalId: string): number {
  return parseInt(globalId.split(":")[1]);
}

/** @gqlQueryField */
export function node(id: ID): GqlNode | null {
  const dbId = parseNodeId(id);
  const prefix = id.split(":")[0];

  switch (prefix) {
    case "post": {
      const row = db.prepare<[number], PostRow>("SELECT * FROM posts WHERE id = ?").get(dbId);
      return row ? postFromRow(row) : null;
    }
    case "user": {
      const row = db.prepare<[number], UserRow>("SELECT * FROM users WHERE id = ?").get(dbId);
      return row ? new User(row) : null;
    }
    case "comment": {
      const row = db.prepare<[number], CommentRow>("SELECT * FROM comments WHERE id = ?").get(dbId);
      return row ? new Comment(row) : null;
    }
    default:
      return null;
  }
}
