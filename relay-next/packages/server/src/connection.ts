import { Int } from "grats";

/** @gqlType */
export type Connection<T> = {
  /** @gqlField */
  edges: Edge<T>[];
  /** @gqlField @killsParentOnException */
  pageInfo: PageInfo;
  /** @gqlField */
  totalCount: Int | null;
};

/** @gqlType */
export type Edge<T> = {
  /** @gqlField */
  node: T;
  /** @gqlField @killsParentOnException */
  cursor: string;
};

/** @gqlType */
export type StreamableConnection<T> = {
  /** @gqlField */
  edges: AsyncIterable<Edge<T>>;
  /** @gqlField @killsParentOnException */
  pageInfo: PageInfo;
  /** @gqlField */
  totalCount: Int | null;
};

/** @gqlType */
export type PageInfo = {
  /** @gqlField @killsParentOnException */
  hasNextPage: boolean;
  /** @gqlField @killsParentOnException */
  hasPreviousPage: boolean;
  /** @gqlField */
  startCursor: string | null;
  /** @gqlField */
  endCursor: string | null;
};
