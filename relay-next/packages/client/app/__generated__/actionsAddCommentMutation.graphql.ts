/**
 * @generated SignedSource<<4b13d9ac55c3c7a395ab4a542376a199>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type actionsAddCommentMutation$variables = {
  authorId: string;
  content: string;
  postId: string;
};
export type actionsAddCommentMutation$data = {
  readonly addComment: {
    readonly comment: {
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type actionsAddCommentMutation = {
  response: actionsAddCommentMutation$data;
  variables: actionsAddCommentMutation$variables;
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
  "name": "postId"
},
v3 = [
  {
    "alias": null,
    "args": [
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
        "name": "postId",
        "variableName": "postId"
      }
    ],
    "concreteType": "AddCommentPayload",
    "kind": "LinkedField",
    "name": "addComment",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Comment",
        "kind": "LinkedField",
        "name": "comment",
        "plural": false,
        "selections": [
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/),
      (v2/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "actionsAddCommentMutation",
    "selections": (v3/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*:: as any*/),
      (v1/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "actionsAddCommentMutation",
    "selections": (v3/*:: as any*/)
  },
  "params": {
    "cacheID": "330bd56662a5cfa48dd6596ef3c07121",
    "id": null,
    "metadata": {},
    "name": "actionsAddCommentMutation",
    "operationKind": "mutation",
    "text": "mutation actionsAddCommentMutation(\n  $postId: ID!\n  $content: String!\n  $authorId: ID!\n) {\n  addComment(postId: $postId, content: $content, authorId: $authorId) {\n    comment {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "56c7e98217c08b6320bdf86aa3766da1";

export default node;
