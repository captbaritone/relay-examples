import { ID } from "grats";
import db from "./db.js";
import { GqlNode, nodeId, parseNodeId } from "./node.js";
import { UserRow } from "./types.js";

/** @gqlType */
export class User implements GqlNode {
  __typename = "User" as const;

  /** @gqlField @killsParentOnException */
  id: ID;
  /** @gqlField */
  name: string;
  /** @gqlField */
  avatarUrl: string | null;
  private dbId: number;

  constructor(row: UserRow) {
    this.id = nodeId("user", row.id);
    this.name = row.name;
    this.avatarUrl = row.avatar_url;
    this.dbId = row.id;
  }

  /** A stable color derived from the user's ID, suitable for avatar backgrounds. @gqlField */
  avatarColor(): string {
    const palette = [
      "#8b6f5e", // warm brown
      "#6b7c6e", // sage
      "#7a6b82", // dusty plum
      "#6b7a8a", // slate blue
      "#8a7a60", // ochre
      "#6e7b72", // muted green
      "#846b6b", // rosewood
      "#6a7a7a", // teal gray
      "#7b7060", // umber
      "#6b6e82", // twilight
    ];
    return palette[this.dbId % palette.length];
  }

  /** @gqlQueryField */
  static me(): User {
    const row = db.prepare<[], UserRow>("SELECT * FROM users WHERE id = 1").get()!;
    return new User(row);
  }

  /** @gqlQueryField */
  static user(id: ID): User | null {
    const row = db
      .prepare<[number], UserRow>("SELECT * FROM users WHERE id = ?")
      .get(parseNodeId(id));
    return row ? new User(row) : null;
  }
}
