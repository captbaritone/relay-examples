/**
 * @generated SignedSource<<5430c06f2924a0a2266b6f795ee4531a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TextPostContent_post$data = {
  readonly content: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostBody_post">;
  readonly " $fragmentType": "TextPostContent_post";
};
export type TextPostContent_post$key = {
  readonly " $data"?: TextPostContent_post$data;
  readonly " $fragmentSpreads": FragmentRefs<"TextPostContent_post">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "throwOnFieldError": true
  },
  "name": "TextPostContent_post",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "content",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostBody_post"
    }
  ],
  "type": "TextPost",
  "abstractKey": null
};

(node as any).hash = "fe7152b22449a76d9aaf3fae585045b0";

export default node;
