/**
 * @generated SignedSource<<790c4994bce8475f3215602d2ce07a64>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type actionsCreatePostMutation$variables = {
  authorId: string;
  content: string;
  imageAltText?: string | null | undefined;
  imageUrl?: string | null | undefined;
};
export type actionsCreatePostMutation$data = {
  readonly createPost: {
    readonly post: {
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type actionsCreatePostMutation = {
  response: actionsCreatePostMutation$data;
  variables: actionsCreatePostMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "authorId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "content"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "imageAltText"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "imageUrl"
},
v4 = [
  {
    "kind": "Variable",
    "name": "authorId",
    "variableName": "authorId"
  },
  {
    "kind": "Variable",
    "name": "content",
    "variableName": "content"
  },
  {
    "kind": "Variable",
    "name": "imageAltText",
    "variableName": "imageAltText"
  },
  {
    "kind": "Variable",
    "name": "imageUrl",
    "variableName": "imageUrl"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/),
      (v2/*:: as any*/),
      (v3/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "actionsCreatePostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*:: as any*/),
        "concreteType": "CreatePostPayload",
        "kind": "LinkedField",
        "name": "createPost",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "post",
            "plural": false,
            "selections": [
              (v5/*:: as any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*:: as any*/),
      (v0/*:: as any*/),
      (v3/*:: as any*/),
      (v2/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "actionsCreatePostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*:: as any*/),
        "concreteType": "CreatePostPayload",
        "kind": "LinkedField",
        "name": "createPost",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
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
              (v5/*:: as any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4a5f6b67ee9af7d5b0e4fadf8cc9ff9c",
    "id": null,
    "metadata": {},
    "name": "actionsCreatePostMutation",
    "operationKind": "mutation",
    "text": "mutation actionsCreatePostMutation(\n  $content: String!\n  $authorId: ID!\n  $imageUrl: String\n  $imageAltText: String\n) {\n  createPost(content: $content, authorId: $authorId, imageUrl: $imageUrl, imageAltText: $imageAltText) {\n    post {\n      __typename\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a89fd6b481ccd485ad0f857c475c99a2";

export default node;
