import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import { getAuthToken, getUsername } from '../utils/auth';
import Gallery from '../types/gallery';
import Favorite from '../types/favorite';
import Image from '../types/image';
import Comment from '../types/comment';
import UserBase from '../types/userBase';
import Settings from '../types/settings';

export async function getUserFavorite(): Promise<Image[]> {
  const data = new FormData();
  const username = await getUsername();
  const token = await getAuthToken();

  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://api.imgur.com/3/account/${username}/favorites`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data,
  };
  const ret = await axios(config);
  const res: Image[] = [];

  ret.data.data.forEach((item: Favorite) => res.push({
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
    description: item.description,
    link: `https://i.imgur.com/${item.cover}.${item.type === 'video/mp4' ? 'mp4' : 'jpg'}`,
    width: item.width,
    height: item.height,
    type: item.type,
    is_album: item.is_album,
  }));
  return res;
}

export async function getUserBase(): Promise<UserBase> {
  const data = new FormData();
  const username = await getUsername();
  const token = await getAuthToken();

  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://api.imgur.com/3/account/${username}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data,
  };
  const ret = await axios(config);
  return ret.data.data;
}

export async function getUserSubmissions(): Promise<Image[]> {
  const data = new FormData();
  const username = await getUsername();
  const token = await getAuthToken();

  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://api.imgur.com/3/account/${username}/submissions`,
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
    width: item.is_album ? item.images[0].width : item.width,
    height: item.is_album ? item.images[0].height : item.height,
    type: item.is_album ? item.images[0].type : item.type,
    link: item.is_album ? `https://i.imgur.com/${item.cover}.${(item.is_album ? item.images[0].type : item.type) === 'video/mp4' ? 'mp4' : 'jpg'}` : item.link,
  }));
  return res;
}

export async function getUserComments(): Promise<Comment[]> {
  const data = new FormData();
  const username = await getUsername();
  const token = await getAuthToken();

  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://api.imgur.com/3/account/${username}/comments`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data,
  };
  const ret = await axios(config);
  return ret.data.data;
}

export async function getUserSettings(): Promise<Settings> {
  const data = new FormData();
  const token = await getAuthToken();

  const config: AxiosRequestConfig = {
    method: 'get',
    url: 'https://api.imgur.com/3/account/me/settings',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data,
  };
  const ret = await axios(config);
  return ret.data.data;
}

export async function updateUserSettings(
  username: string, bio: string, messaging_enabled: boolean, public_images: boolean,
  show_mature: boolean, newsletter_subscribed: boolean,
): Promise<void> {
  const data = new FormData();
  const token = await getAuthToken();
  const user = await getUsername();

  data.append('bio', bio);
  data.append('username', username);
  data.append('show_mature', show_mature);
  data.append('messaging_enabled', messaging_enabled);
  data.append('public_images', public_images);
  data.append('newsletter_subscribed', newsletter_subscribed);

  const config: AxiosRequestConfig = {
    method: 'put',
    url: `https://api.imgur.com/3/account/${user}/settings`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data,
  };
  const ret = await axios(config);
  return ret.data.data;
}
