/**
 * @generated SignedSource<<a38b58c9d66283c86aa6380db61ae1d2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostBody_post$data = {
  readonly author: {
    readonly id: string;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"UserAvatar_user">;
  };
  readonly createdAt: string;
  readonly id: string;
  readonly " $fragmentType": "PostBody_post";
};
export type PostBody_post$key = {
  readonly " $data"?: PostBody_post$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostBody_post">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "throwOnFieldError": true
  },
  "name": "PostBody_post",
  "selections": [
    (v0/*:: as any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "author",
      "plural": false,
      "selections": [
        (v0/*:: as any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "UserAvatar_user"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": "__isPost"
};
})();

(node as any).hash = "ef91cc0a79e5bb4bc937e63f7986e98a";

export default node;
