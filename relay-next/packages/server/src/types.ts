export type UserRow = { id: number; name: string; avatar_url: string | null };

export type PostRow = {
  id: number;
  author_id: number;
  post_type: "TEXT" | "IMAGE";
  content: string;
  image_url: string | null;
  image_alt_text: string | null;
  upvote_count: number;
  created_at: string;
};

export type CommentRow = {
  id: number;
  post_id: number;
  author_id: number;
  content: string;
  created_at: string;
};
