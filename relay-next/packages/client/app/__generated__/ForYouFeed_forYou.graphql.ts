/**
 * @generated SignedSource<<f499dd8e0aad38bf9a14bd0ad7dbe083>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ForYouFeed_forYou$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"PostCard_post">;
    };
  }>;
  readonly " $fragmentType": "ForYouFeed_forYou";
};
export type ForYouFeed_forYou$key = {
  readonly " $data"?: ForYouFeed_forYou$data;
  readonly " $fragmentSpreads": FragmentRefs<"ForYouFeed_forYou">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "throwOnFieldError": true
  },
  "name": "ForYouFeed_forYou",
  "selections": [
    {
      "kind": "Stream",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PostEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PostCard_post"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ]
    }
  ],
  "type": "PostStreamableConnection",
  "abstractKey": null
};

(node as any).hash = "8125707393a214789884cfce75ac83f2";

export default node;
