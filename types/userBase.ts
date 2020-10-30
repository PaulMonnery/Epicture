export default interface UserBase {
  avatar: string,
  avatar_name: string,
  bio: string | null,
  cover: string,
  cover_name: string,
  created: number,
  id: string | null,
  is_blocked: boolean,
  pro_expiration: boolean,
  reputation: number,
  reputation_name: string,
  url: string,
  user_follow: {
    status: boolean,
  },
}
