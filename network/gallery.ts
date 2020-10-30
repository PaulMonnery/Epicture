import axios, { AxiosRequestConfig } from 'axios';
import Gallery from '../types/gallery';
import { getAuthToken, AUTH_CLIENT_ID } from '../utils/auth';
import Comment from '../types/comment';
import Image from '../types/image';

export interface GalleryOptions {
  section: 'hot' | 'top' | 'user';
  sort: 'viral' | 'top' | 'time' | 'rising';
  window: 'day' | 'week' | 'month' | 'year' | 'all';
  page: number;
}

export async function getGallery(
  { section, sort, page, window }: GalleryOptions,
): Promise<Image[]> {
  const data = new FormData();

  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://api.imgur.com/3/gallery/${section}/${sort}/${window}/${page}`,
    headers: {
      Authorization: `Client-ID ${AUTH_CLIENT_ID}`,
    },
    data,
  };
  const ret = await axios(config);
  const res: Image[] = [];

  ret.data.data.forEach((item: Gallery) => res.push({
    id: item.id,
    favorite: item.favorite,
    ups: item.ups,
    comment_count: item.comment_count,
    favorite_count: item.favorite_count,
    vote: item.vote,
    views: item.views,
    account_url: item.account_url,
    title: item.title,
    cover: item.cover,
    is_album: item.is_album,
    description: item.is_album ? item.images[0].description : item.description,
    link: item.is_album ? item.images[0].link : item.link,
    width: item.is_album ? item.images[0].width : item.width,
    height: item.is_album ? item.images[0].height : item.height,
    type: item.is_album ? item.images[0].type : item.type,
  }));

  return res;
}

export async function searchGallery(query: string, page: number): Promise<Image[]> {
  const data = new FormData();
  const token = await getAuthToken();

  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://api.imgur.com/3/gallery/search/viral/all/${page}?q=${query}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data,
  };
  const ret = await axios(config);
  const res: Image[] = [];

  ret.data.data.forEach((item: Gallery) => res.push({
    id: item.id,
    favorite: item.favorite,
    ups: item.ups,
    comment_count: item.comment_count,
    favorite_count: item.favorite_count,
    vote: item.vote,
    views: item.views,
    account_url: item.account_url,
    title: item.title,
    cover: item.cover,
    is_album: item.is_album,
    description: item.is_album ? item.images[0].description : item.description,
    link: item.is_album ? item.images[0].link : item.link,
    width: item.is_album ? item.images[0].width : item.width,
    height: item.is_album ? item.images[0].height : item.height,
    type: item.is_album ? item.images[0].type : item.type,
  }));

  return res;
}

export async function getGalleryComments(hash: string): Promise<Comment[]> {
  const data = new FormData();
  const token = await getAuthToken();

  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://api.imgur.com/3/gallery/${hash}/comments/`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data,
  };
  const ret = await axios(config);
  return ret.data.data;
}
