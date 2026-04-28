/**
 * @generated SignedSource<<e6eb9f4197bbe6afbe0c5a5325d55dd6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SentimentAnalysis_post$data = {
  readonly sentimentAnalysis: string | null | undefined;
  readonly " $fragmentType": "SentimentAnalysis_post";
};
export type SentimentAnalysis_post$key = {
  readonly " $data"?: SentimentAnalysis_post$data;
  readonly " $fragmentSpreads": FragmentRefs<"SentimentAnalysis_post">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SentimentAnalysis_post",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sentimentAnalysis",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": "__isPost"
};

(node as any).hash = "267344a05fd3f9a78d161f358cfc6182";

export default node;
