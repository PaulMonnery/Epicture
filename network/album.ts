import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import { getAuthToken } from '../utils/auth';
import Gallery from '../types/gallery';

export async function faveAlbum(id: string): Promise<void> {
  const data = new FormData();
  const token = await getAuthToken();

  const config: AxiosRequestConfig = {
    method: 'post',
    url: `https://api.imgur.com/3/album/${id}/favorite`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  await axios(config);
}

export async function voteAlbum(id: string, vote: 'up' | 'down' | 'veto'): Promise<void> {
  const data = new FormData();
  const token = await getAuthToken();

  const config: AxiosRequestConfig = {
    method: 'post',
    url: `https://api.imgur.com/3/gallery/${id}/vote/${vote}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  await axios(config);
}

export async function uploadAlbum(
  image_id: string, title: string, description: string, privacy: boolean,
): Promise<Gallery> {
  const data = new FormData();
  const token = await getAuthToken();

  data.append('ids[]', [image_id]);
  data.append('title', title);
  data.append('description', description);
  data.append('privacy', privacy ? 'public' : 'hidden');
  data.append('cover', image_id);

  const config: AxiosRequestConfig = {
    method: 'post',
    url: 'https://api.imgur.com/3/album',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  const ret = await axios(config);
  return ret.data.data;
}

export async function deleteAlbum(id: string): Promise<void> {
  const data = new FormData();
  const token = await getAuthToken();

  const config: AxiosRequestConfig = {
    method: 'delete',
    url: `https://api.imgur.com/3/album/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  await axios(config);
}
