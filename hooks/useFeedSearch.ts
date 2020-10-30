import { useState, useEffect } from 'react';
import { searchGallery } from '../network/gallery';
import Image from '../types/image';

export default function useFeedSearch(): {
  images: Image[] | null;
  searchString: string;
  refreshing: boolean;
  handleRefresh: () => Promise<void>;
  loadNewPage: () => Promise<void>;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
} {
  const [searchString, setSearchString] = useState('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [images, setImages] = useState<Image[] | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadGallery = async () => {
      setImages(null);
      const gallery = await searchGallery(searchString, 1);
      if (gallery) setImages(gallery);
    };
    if (searchString) loadGallery();
  }, [searchString]);

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    const gallery = await searchGallery(searchString, page + 1);
    if (gallery) {
      setImages(null);
      setImages(gallery);
      setPage(page + 1);
    }
    setRefreshing(false);
  };

  const loadNewPage = async (): Promise<void> => {
    const gallery = await searchGallery(searchString, page + 1);
    if (gallery) {
      setImages([...images, ...gallery]);
      setPage(page + 1);
    }
  };
  return { images, searchString, refreshing, handleRefresh, loadNewPage, setSearchString };
}
