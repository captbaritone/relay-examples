/**
 * @generated SignedSource<<d2f401944b65a1dbb26da62778078fa9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchPageQuery$variables = {
  query: string;
};
export type SearchPageQuery$data = {
  readonly searchPosts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"PostCard_post">;
      };
    }>;
    readonly totalCount: number | null | undefined;
  };
};
export type SearchPageQuery = {
  response: SearchPageQuery$data;
  variables: SearchPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "query"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  },
  {
    "kind": "Variable",
    "name": "query",
    "variableName": "query"
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
  "name": "totalCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
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
        (v2/*:: as any*/),
        (v5/*:: as any*/),
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
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": {
      "throwOnFieldError": true
    },
    "name": "SearchPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "PostConnection",
        "kind": "LinkedField",
        "name": "searchPosts",
        "plural": false,
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
                  (v2/*:: as any*/),
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
          },
          (v3/*:: as any*/)
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
    "name": "SearchPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "PostConnection",
        "kind": "LinkedField",
        "name": "searchPosts",
        "plural": false,
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
                  (v2/*:: as any*/),
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
                      (v3/*:: as any*/),
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
                              (v2/*:: as any*/),
                              (v4/*:: as any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "User",
                                "kind": "LinkedField",
                                "name": "author",
                                "plural": false,
                                "selections": [
                                  (v5/*:: as any*/),
                                  (v2/*:: as any*/)
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
                      (v4/*:: as any*/),
                      (v6/*:: as any*/)
                    ],
                    "type": "TextPost",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*:: as any*/),
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
                      (v6/*:: as any*/)
                    ],
                    "type": "ImagePost",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "57a080a99642914f0ac0caa7a550720d",
    "id": null,
    "metadata": {},
    "name": "SearchPageQuery",
    "operationKind": "query",
    "text": "query SearchPageQuery(\n  $query: String!\n) {\n  searchPosts(query: $query, first: 20) {\n    edges {\n      node {\n        __typename\n        id\n        ...PostCard_post\n      }\n    }\n    totalCount\n  }\n}\n\nfragment CommentSection_post on Post {\n  __isPost: __typename\n  id\n  comments {\n    edges {\n      node {\n        id\n        content\n        author {\n          name\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ImagePostContent_post on ImagePost {\n  id\n  content\n  imageUrl\n  imageAltText\n  ...PostBody_post\n}\n\nfragment PostBody_post on Post {\n  __isPost: __typename\n  id\n  createdAt\n  author {\n    id\n    name\n    ...UserAvatar_user\n  }\n}\n\nfragment PostCardTransition_post on Post {\n  __isPost: __typename\n  id\n}\n\nfragment PostCard_post on Post {\n  __isPost: __typename\n  id\n  upvoteCount\n  comments {\n    totalCount\n  }\n  ...PostContent_post\n  ...CommentSection_post\n  ...PostCardTransition_post\n}\n\nfragment PostContent_post on Post {\n  __isPost: __typename\n  __typename\n  ...TextPostContent_post\n  ...ImagePostContent_post\n}\n\nfragment TextPostContent_post on TextPost {\n  content\n  ...PostBody_post\n}\n\nfragment UserAvatar_user on User {\n  name\n  avatarColor\n}\n"
  }
};
})();

(node as any).hash = "6320d1178bcda7d426891b4b11b95b14";

export default node;
