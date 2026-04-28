/**
 * @generated SignedSource<<a40372d5f604ea4d88c2d5079de61ed7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ImageDetailQuery$variables = {
  id: string;
};
export type ImageDetailQuery$data = {
  readonly post: {
    readonly imageAltText?: string | null | undefined;
    readonly imageUrl?: string;
  } | null | undefined;
};
export type ImageDetailQuery = {
  response: ImageDetailQuery$data;
  variables: ImageDetailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "InlineFragment",
  "selections": [
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
    }
  ],
  "type": "ImagePost",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": {
      "throwOnFieldError": true
    },
    "name": "ImageDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          (v2/*:: as any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "ImageDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9cef765891acb308e853fdb191a871d7",
    "id": null,
    "metadata": {},
    "name": "ImageDetailQuery",
    "operationKind": "query",
    "text": "query ImageDetailQuery(\n  $id: ID!\n) {\n  post(id: $id) {\n    __typename\n    ... on ImagePost {\n      imageUrl\n      imageAltText\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "fab1d1bf3d04c2af84c72033f7659f78";

export default node;
