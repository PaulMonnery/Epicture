export default interface Image {
  id: string,
  title: string,
  description: string | null,
  cover: string,
  width: number,
  height: number,
  account_url: string,
  views: number,
  link: string,
  ups: number,
  vote: string | null,
  favorite: boolean,
  comment_count: number,
  favorite_count: number,
  type: string,
  is_album: boolean;
}
