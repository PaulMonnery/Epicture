/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { getGallery, GalleryOptions } from '../network/gallery';
import Image from '../types/image';

export default function useFeed(): {
  images: Image[];
  refreshing: boolean;
  info: GalleryOptions;
  setInfo: React.Dispatch<React.SetStateAction<GalleryOptions>>;
  handleRefresh: () => Promise<void>;
  loadNewPage: () => Promise<void>;
} {
  const [images, setImages] = useState<Image[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [info, setInfo] = useState<GalleryOptions>({ section: 'hot', sort: 'viral', page: 1, window: 'day' });

  useEffect(() => {
    const loadGallery = async () => {
      const gallery = await getGallery({ ...info });
      if (gallery) setImages(gallery);
    };
    if (!images && !refreshing) loadGallery();
  }, [images]);

  useEffect(() => {
    const reloadGallery = async () => {
      const gallery = await getGallery({ ...info });
      if (gallery) setImages(gallery);
    };
    reloadGallery();
  }, [info.section, info.sort]);

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    const newInfo = { ...info };
    newInfo.page += 1;
    const gallery = await getGallery(newInfo);
    if (gallery) {
      setImages([]);
      setImages(gallery);
      setInfo(newInfo);
    }
    setRefreshing(false);
  };

  const loadNewPage = async (): Promise<void> => {
    const newInfo = { ...info };
    newInfo.page += 1;
    const newGallery = await getGallery(newInfo);
    if (newGallery) {
      setImages([...images, ...newGallery]);
      setInfo(newInfo);
    }
  };

  return { images, refreshing, info, setInfo, handleRefresh, loadNewPage };
}
