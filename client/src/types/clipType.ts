export interface ClipType {
  id: number;
  user_id: number;
  user_name: string;
  game_name: string;
  game_id: number;
  stream_type: string;
  stream_title: string;
  stream_viewer_count: number;
  language: string;

  login: string;
  profile_image_url: string;

  clip_id: string;
  clip_embed_url: string;
  clip_title: string;
  clip_view_count: number;
  clip_created_at: Date;

  created_at: Date;
}
