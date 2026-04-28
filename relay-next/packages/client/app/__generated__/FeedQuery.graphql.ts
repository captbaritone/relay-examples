/**
 * @generated SignedSource<<57cbd7232132e05238979bf310dca4ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeedQuery$variables = Record<PropertyKey, never>;
export type FeedQuery$data = {
  readonly forYou: {
    readonly " $fragmentSpreads": FragmentRefs<"ForYouFeed_forYou">;
  };
};
export type FeedQuery = {
  response: FeedQuery$data;
  variables: FeedQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "kind": "InlineFragment",
  "selections": [
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
        (v1/*:: as any*/),
        (v3/*:: as any*/),
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
  ],
  "type": "Post",
  "abstractKey": "__isPost"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": {
      "throwOnFieldError": true
    },
    "name": "FeedQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*:: as any*/),
        "concreteType": "PostStreamableConnection",
        "kind": "LinkedField",
        "name": "forYou",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ForYouFeed_forYou"
          }
        ],
        "storageKey": "forYou(first:5)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FeedQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*:: as any*/),
        "concreteType": "PostStreamableConnection",
        "kind": "LinkedField",
        "name": "forYou",
        "plural": false,
        "selections": [
          {
            "if": null,
            "kind": "Stream",
            "label": "ForYouFeed_forYou$stream$edges",
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
                        "name": "__typename",
                        "storageKey": null
                      },
                      (v1/*:: as any*/),
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isPost"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "upvoteCount",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommentConnection",
                        "kind": "LinkedField",
                        "name": "comments",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "totalCount",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommentEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Comment",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v1/*:: as any*/),
                                  (v2/*:: as any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "User",
                                    "kind": "LinkedField",
                                    "name": "author",
                                    "plural": false,
                                    "selections": [
                                      (v3/*:: as any*/),
                                      (v1/*:: as any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*:: as any*/),
                          (v4/*:: as any*/)
                        ],
                        "type": "TextPost",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*:: as any*/),
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
                          (v4/*:: as any*/)
                        ],
                        "type": "ImagePost",
                        "abstractKey": null
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
        "storageKey": "forYou(first:5)"
      }
    ]
  },
  "params": {
    "cacheID": "6255137cd2ee4b7f8d3bd36f872ee661",
    "id": null,
    "metadata": {},
    "name": "FeedQuery",
    "operationKind": "query",
    "text": "query FeedQuery {\n  forYou(first: 5) {\n    ...ForYouFeed_forYou\n  }\n}\n\nfragment CommentSection_post on Post {\n  __isPost: __typename\n  id\n  comments {\n    edges {\n      node {\n        id\n        content\n        author {\n          name\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ForYouFeed_forYou on PostStreamableConnection {\n  edges @stream(label: \"ForYouFeed_forYou$stream$edges\", initialCount: 1) {\n    node {\n      __typename\n      id\n      ...PostCard_post\n    }\n  }\n}\n\nfragment ImagePostContent_post on ImagePost {\n  id\n  content\n  imageUrl\n  imageAltText\n  ...PostBody_post\n}\n\nfragment PostBody_post on Post {\n  __isPost: __typename\n  id\n  createdAt\n  author {\n    id\n    name\n    ...UserAvatar_user\n  }\n}\n\nfragment PostCardTransition_post on Post {\n  __isPost: __typename\n  id\n}\n\nfragment PostCard_post on Post {\n  __isPost: __typename\n  id\n  upvoteCount\n  comments {\n    totalCount\n  }\n  ...PostContent_post\n  ...CommentSection_post\n  ...PostCardTransition_post\n}\n\nfragment PostContent_post on Post {\n  __isPost: __typename\n  __typename\n  ...TextPostContent_post\n  ...ImagePostContent_post\n}\n\nfragment TextPostContent_post on TextPost {\n  content\n  ...PostBody_post\n}\n\nfragment UserAvatar_user on User {\n  name\n  avatarColor\n}\n"
  }
};
})();

(node as any).hash = "71fd991e93ec6d43f5ae6699f9b9ceaa";

export default node;
