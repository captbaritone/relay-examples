import { ID } from "grats";
import db from "./db.js";
import { GqlNode, nodeId, parseNodeId } from "./node.js";
import { CommentRow, UserRow, PostRow } from "./types.js";
import { User } from "./User.js";
import { Post, postFromRow } from "./Post.js";

/** @gqlType */
export type AddCommentPayload = {
  /** @gqlField */
  comment: Comment | null;
  /** @gqlField */
  post: Post | null;
};

/** @gqlType */
export class Comment implements GqlNode {
  __typename = "Comment" as const;

  /** @gqlField @killsParentOnException */
  id: ID;
  /** @gqlField */
  content: string;
  /** @gqlField */
  createdAt: string;
  private authorId: number;

  constructor(row: CommentRow) {
    this.id = nodeId("comment", row.id);
    this.content = row.content;
    this.createdAt = row.created_at;
    this.authorId = row.author_id;
  }

  /** @gqlField */
  author(): User {
    return new User(
      db.prepare<[number], UserRow>("SELECT * FROM users WHERE id = ?").get(this.authorId)!,
    );
  }

  /** @gqlMutationField */
  static addComment(
    postId: ID,
    content: string,
    authorId: ID,
  ): AddCommentPayload {
    const dbPostId = parseNodeId(postId);
    const dbAuthorId = parseNodeId(authorId);
    const postRow = db
      .prepare<[number], PostRow>("SELECT * FROM posts WHERE id = ?")
      .get(dbPostId);
    const userRow = db
      .prepare<[number], UserRow>("SELECT * FROM users WHERE id = ?")
      .get(dbAuthorId);
    if (!postRow || !userRow) return { comment: null, post: null };

    const now = new Date().toISOString();
    const result = db
      .prepare(
        "INSERT INTO comments (post_id, author_id, content, created_at) VALUES (?, ?, ?, ?)",
      )
      .run(dbPostId, dbAuthorId, content, now);

    const commentRow = db
      .prepare<[number | bigint], CommentRow>("SELECT * FROM comments WHERE id = ?")
      .get(result.lastInsertRowid)!;
    const updatedPostRow = db
      .prepare<[number], PostRow>("SELECT * FROM posts WHERE id = ?")
      .get(dbPostId)!;

    return {
      comment: new Comment(commentRow),
      post: postFromRow(updatedPostRow),
    };
  }
}
