/**
 * @generated SignedSource<<2d42fa9a79e41742ef38aee3b92aff15>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ImagePostContent_post$data = {
  readonly content: string;
  readonly id: string;
  readonly imageAltText: string | null | undefined;
  readonly imageUrl: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostBody_post">;
  readonly " $fragmentType": "ImagePostContent_post";
};
export type ImagePostContent_post$key = {
  readonly " $data"?: ImagePostContent_post$data;
  readonly " $fragmentSpreads": FragmentRefs<"ImagePostContent_post">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "throwOnFieldError": true
  },
  "name": "ImagePostContent_post",
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
      "name": "content",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageAltText",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostBody_post"
    }
  ],
  "type": "ImagePost",
  "abstractKey": null
};

(node as any).hash = "ee86b4d4254d03e5f376b446f811a516";

export default node;
