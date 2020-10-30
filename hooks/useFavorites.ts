import { useState, useEffect } from 'react';
import { getUserFavorite } from '../network/user';
import { faveAlbum } from '../network/album';
import Image from '../types/image';

export default function useFavorites(): {
  images: Image[] | null;
  refreshing: boolean;
  handleUnFave: (id: string) => Promise<void>;
  handleRefresh: () => Promise<void>;
} {
  const [images, setImages] = useState<Image[] | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const loadFavorite = async () => {
      const favorites = await getUserFavorite();
      if (favorites) setImages(favorites);
    };
    if (!images) loadFavorite();
  }, [images]);

  const handleUnFave = async (id: string): Promise<void> => {
    const oldImages = [...images];
    for (let index = 0; index < oldImages.length; index += 1) {
      if (oldImages[index].id === id) {
        oldImages.splice(index, 1);
        break;
      }
    }
    setImages(oldImages);
    await faveAlbum(id);
  };

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    const favorites = await getUserFavorite();
    if (favorites) {
      setImages(null);
      setImages(favorites);
    }
    setRefreshing(false);
  };
  return { images, refreshing, handleUnFave, handleRefresh };
}
