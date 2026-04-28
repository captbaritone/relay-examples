/**
 * @generated SignedSource<<2fc5190bd04a57394feb14355c531184>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type actionsUpvoteMutation$variables = {
  postId: string;
};
export type actionsUpvoteMutation$data = {
  readonly upvotePost: {
    readonly post: {
      readonly id: string;
      readonly upvoteCount: number | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type actionsUpvoteMutation = {
  response: actionsUpvoteMutation$data;
  variables: actionsUpvoteMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "postId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "postId",
    "variableName": "postId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "upvoteCount",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "actionsUpvoteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "UpvotePostPayload",
        "kind": "LinkedField",
        "name": "upvotePost",
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
              (v2/*:: as any*/),
              (v3/*:: as any*/)
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
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "actionsUpvoteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "UpvotePostPayload",
        "kind": "LinkedField",
        "name": "upvotePost",
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
              (v2/*:: as any*/),
              (v3/*:: as any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0e9811949f30ef2688fff1dff964eba5",
    "id": null,
    "metadata": {},
    "name": "actionsUpvoteMutation",
    "operationKind": "mutation",
    "text": "mutation actionsUpvoteMutation(\n  $postId: ID!\n) {\n  upvotePost(postId: $postId) {\n    post {\n      __typename\n      id\n      upvoteCount\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4c7be3401458f05a4a20185a739b3e10";

export default node;
