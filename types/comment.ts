export interface CommentImage {
  album_cover: string;
  author: string;
  author_id: number;
  children: [];
  comment: string;
  datetime: number;
  deleted: boolean;
  downs: number;
  has_admin_badge: boolean;
  id: number;
  image_id: string;
  on_album: boolean;
  parent_id: number;
  platform: string;
  points: number;
  ups: number;
  vote: string | null;
}

export default interface Comment {
  album_cover: string;
  author: string;
  author_id: number;
  children: CommentImage[];
  comment: string;
  datetime: number;
  deleted: boolean;
  downs: number;
  has_admin_badge: boolean;
  id: number;
  image_id: string;
  on_album: boolean;
  parent_id: number;
  platform: string;
  points: number;
  ups: number;
  vote: null;
}
