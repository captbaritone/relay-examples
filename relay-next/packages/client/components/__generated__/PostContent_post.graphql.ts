/**
 * @generated SignedSource<<d6e22f9b4013f9e6e59aff3a9251bdfc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostContent_post$data = {
  readonly __typename: string;
  readonly ImagePostContent_post: {
    readonly " $fragmentSpreads": FragmentRefs<"ImagePostContent_post">;
  } | null | undefined;
  readonly TextPostContent_post: {
    readonly " $fragmentSpreads": FragmentRefs<"TextPostContent_post">;
  } | null | undefined;
  readonly " $fragmentType": "PostContent_post";
};
export type PostContent_post$key = {
  readonly " $data"?: PostContent_post$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostContent_post">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "throwOnFieldError": true
  },
  "name": "PostContent_post",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "fragment": {
        "kind": "InlineFragment",
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TextPostContent_post"
          }
        ],
        "type": "TextPost",
        "abstractKey": null
      },
      "kind": "AliasedInlineFragmentSpread",
      "name": "TextPostContent_post"
    },
    {
      "fragment": {
        "kind": "InlineFragment",
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ImagePostContent_post"
          }
        ],
        "type": "ImagePost",
        "abstractKey": null
      },
      "kind": "AliasedInlineFragmentSpread",
      "name": "ImagePostContent_post"
    }
  ],
  "type": "Post",
  "abstractKey": "__isPost"
};

(node as any).hash = "780c42bf90688c8405948a7318b0ccd8";

export default node;
