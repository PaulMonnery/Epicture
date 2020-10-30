import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import { getAuthToken } from '../utils/auth';
import Gallery from '../types/gallery';
import NewPostDto from '../types/newPost';

export async function uploadImage(
  image_url: string, title: string, description: string,
): Promise<NewPostDto> {
  const data = new FormData();
  const token = await getAuthToken();

  data.append('image', image_url);
  data.append('title', title);
  data.append('description', description);
  data.append('type', 'base64');
  data.append('name', 'image');

  const config: AxiosRequestConfig = {
    method: 'post',
    url: 'https://api.imgur.com/3/upload',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  const ret = await axios(config);
  return ret.data.data;
}

export async function shareImage(
  image_id: string, title: string, mature: boolean,
): Promise<Gallery> {
  const data = new FormData();
  const token = await getAuthToken();

  data.append('title', title);
  data.append('mature', mature ? 0 : 1);

  const config: AxiosRequestConfig = {
    method: 'post',
    url: `https://api.imgur.com/3/gallery/image/${image_id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  const ret = await axios(config);
  return ret.data.data;
}

export async function deleteImage(id: string): Promise<void> {
  const data = new FormData();
  const token = await getAuthToken();

  const config: AxiosRequestConfig = {
    method: 'delete',
    url: `https://api.imgur.com/3/image/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  await axios(config);
}
