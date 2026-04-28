/**
 * @generated SignedSource<<ef44fc53ab9f1769513c80185c18a6cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderQuery$variables = Record<PropertyKey, never>;
export type HeaderQuery$data = {
  readonly me: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"UserAvatar_user">;
  };
};
export type HeaderQuery = {
  response: HeaderQuery$data;
  variables: HeaderQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": {
      "throwOnFieldError": true
    },
    "name": "HeaderQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*:: as any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserAvatar_user"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HeaderQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatarColor",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "11d7011e470e13c1850feed5c3f2bba2",
    "id": null,
    "metadata": {},
    "name": "HeaderQuery",
    "operationKind": "query",
    "text": "query HeaderQuery {\n  me {\n    id\n    ...UserAvatar_user\n  }\n}\n\nfragment UserAvatar_user on User {\n  name\n  avatarColor\n}\n"
  }
};
})();

(node as any).hash = "d6d316edd2e070139e6693a0be92039a";

export default node;
