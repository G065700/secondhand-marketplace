import { User } from '@/prisma/client';
import { MouseEvent, useMemo } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface UseFavorite {
  productId: string;
  currentUser?: User | null;
}

const useFavorite = ({ productId, currentUser }: UseFavorite) => {
  const router = useRouter();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(productId);
  }, [productId, currentUser]);

  const toggleFavorite = async (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 이벤트 버블링 차단

    if (!currentUser) {
      toast.warning('로그인을 먼저 진행해 주세요.');
      return;
    }

    try {
      let request;
      let message;

      if (hasFavorite) {
        request = () => axios.delete(`/api/favorites/${productId}`);
        message = '좋아요가 해제되었습니다.';
      } else {
        request = () => axios.post(`/api/favorites/${productId}`);
        message = '좋아요 되었습니다.';
      }

      await request();
      router.refresh();
      toast.success(message);
    } catch (error) {
      toast.error('좋아요 설정에 실패하였습니다.');
    }
  };

  return {
    hasFavorite,
    toggleFavorite,
  };
};

export default useFavorite;
