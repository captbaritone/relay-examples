/**
 * @generated SignedSource<<c0cc96966ed03a7e993668188cb668ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostCard_post$data = {
  readonly comments: {
    readonly totalCount: number | null | undefined;
  };
  readonly id: string;
  readonly upvoteCount: number;
  readonly " $fragmentSpreads": FragmentRefs<"CommentSection_post" | "PostCardTransition_post" | "PostContent_post">;
  readonly " $fragmentType": "PostCard_post";
};
export type PostCard_post$key = {
  readonly " $data"?: PostCard_post$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostCard_post">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "throwOnFieldError": true
  },
  "name": "PostCard_post",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "upvoteCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CommentConnection",
      "kind": "LinkedField",
      "name": "comments",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostContent_post"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CommentSection_post"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostCardTransition_post"
    }
  ],
  "type": "Post",
  "abstractKey": "__isPost"
};

(node as any).hash = "c61a319e72d9d29d3d1192a7484611ca";

export default node;
