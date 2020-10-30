import { useState, useEffect } from 'react';
import { getUserSubmissions } from '../network/user';
import { deleteImage } from '../network/image';
import { deleteAlbum } from '../network/album';
import Image from '../types/image';

export default function useSubmissions(): {
  images: Image[] | null | undefined;
  refreshing: boolean;
  handleSuppress: (id: string) => void;
  handleRefresh: () => Promise<void>;
} {
  const [images, setImages] = useState<Image[] | null>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  useEffect(() => {
    const loadSubmissions = async () => {
      const submissions = await getUserSubmissions();
      if (submissions) setImages(submissions);
    };
    if (!images) loadSubmissions();
  }, [images]);

  const handleSuppress = (id: string) => {
    const oldImages = [...images];
    for (let index = 0; index < oldImages.length; index += 1) {
      if (oldImages[index].id === id) {
        if (oldImages[index].is_album) deleteAlbum(id);
        else deleteImage(id);
        oldImages.splice(index, 1);
        break;
      }
    }
    setImages(oldImages);
  };

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    const submissions = await getUserSubmissions();
    if (submissions) {
      setImages(null);
      setImages(submissions);
    }
    setRefreshing(false);
  };
  return { images, refreshing, handleSuppress, handleRefresh };
}
