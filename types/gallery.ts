export default interface Gallery {
  id: string;
  title: string;
  description: string | null;
  datetime: number;
  cover: string;
  cover_width: number;
  cover_height: number;
  account_url: string;
  account_id: number;
  privacy: string;
  layout: string;
  views: number;
  link: string;
  ups: number;
  downs: number;
  points: number;
  score: number;
  is_album: boolean;
  vote: string | null;
  favorite: boolean;
  nsfw: boolean;
  section: string;
  comment_count: number;
  favorite_count: number;
  topic: string;
  topic_id: number;
  images_count: number;
  in_gallery: boolean;
  width?: number;
  height?: number;
  type?: string;
  is_ad: boolean;
  tags: [
    {
      name: string;
      display_name: string;
      followers: number;
      total_items: number;
      following: boolean;
      is_whitelisted: boolean;
      background_hash: string;
      thumbnail_hash: string | null;
      accent: string;
      background_is_animated: boolean;
      thumbnail_is_animated: boolean;
      is_promoted: boolean;
      description: string;
      logo_hash: string | null;
      logo_destination_url: string | null;
      description_annotations: Record<string, unknown>;
    },
  ];
  ad_type: number;
  ad_url: string;
  in_most_viral: boolean;
  include_album_ads: boolean;
  images: [
    {
      id: string;
      title: string | null;
      description: string | null;
      datetime: number;
      type: string;
      animated: boolean;
      width: number;
      height: number;
      size: number;
      views: number;
      bandwidth: number;
      vote: string | null;
      favorite: boolean;
      nsfw: null;
      section: string | null;
      account_url: string | null;
      account_id: string | null;
      is_ad: boolean;
      in_most_viral: boolean;
      has_sound: boolean;
      tags: [];
      ad_type: number;
      ad_url: string;
      edited: string;
      in_gallery: boolean;
      link: string;
      mp4_size: number;
      mp4: string;
      gifv: string;
      hls: string;
      processing: {
        status: string;
      };
      comment_count: number | null;
      favorite_count: number | null;
      ups: number | null;
      downs: number | null;
      points: number | null;
      score: number | null;
    },
  ];
  ad_config: {
    safeFlags: string[];
    highRiskFlags: string[];
    unsafeFlags: string[];
    wallUnsafeFlags: string[];
    showsAds: boolean;
  };
}
