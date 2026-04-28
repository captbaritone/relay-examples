"use server";

import { commitMutationAsync, graphql } from "@/relay/server";
import { actionsUpvoteMutation } from "./__generated__/actionsUpvoteMutation.graphql";
import { actionsAddCommentMutation } from "./__generated__/actionsAddCommentMutation.graphql";
import { actionsCreatePostMutation } from "./__generated__/actionsCreatePostMutation.graphql";
import { refresh } from "next/cache";

const CURRENT_USER_ID = "user:1"; // Hardcoded for demo

export async function upvotePost(postId: string): Promise<number | null> {
  const result = await commitMutationAsync<actionsUpvoteMutation>(
    graphql`
      mutation actionsUpvoteMutation($postId: ID!) {
        upvotePost(postId: $postId) {
          post {
            id
            upvoteCount
          }
        }
      }
    `,
    { postId },
  );

  return result?.upvotePost?.post?.upvoteCount ?? null;
}

export async function addComment(
  postId: string,
  content: string,
): Promise<void> {
  await commitMutationAsync<actionsAddCommentMutation>(
    graphql`
      mutation actionsAddCommentMutation(
        $postId: ID!
        $content: String!
        $authorId: ID!
      ) {
        addComment(postId: $postId, content: $content, authorId: $authorId) {
          comment {
            id
          }
        }
      }
    `,
    { postId, content, authorId: CURRENT_USER_ID },
  );

  refresh();
}

export async function createPost(
  content: string,
  imageUrl?: string,
  imageAltText?: string,
): Promise<void> {
  await commitMutationAsync<actionsCreatePostMutation>(
    graphql`
      mutation actionsCreatePostMutation(
        $content: String!
        $authorId: ID!
        $imageUrl: String
        $imageAltText: String
      ) {
        createPost(
          content: $content
          authorId: $authorId
          imageUrl: $imageUrl
          imageAltText: $imageAltText
        ) {
          post {
            id
          }
        }
      }
    `,
    {
      content,
      authorId: CURRENT_USER_ID,
      imageUrl: imageUrl ?? null,
      imageAltText: imageAltText ?? null,
    },
  );

  refresh();
}
