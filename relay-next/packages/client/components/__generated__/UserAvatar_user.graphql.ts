/**
 * @generated SignedSource<<7a4995802cfb6ab982c03e3efebd2dde>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserAvatar_user$data = {
  readonly avatarColor: string;
  readonly name: string;
  readonly " $fragmentType": "UserAvatar_user";
};
export type UserAvatar_user$key = {
  readonly " $data"?: UserAvatar_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserAvatar_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "throwOnFieldError": true
  },
  "name": "UserAvatar_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatarColor",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "f3129ca95f95163598e2f9710b7d69d4";

export default node;
