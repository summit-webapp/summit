import { useState } from 'react';
import { useRouter } from 'next/router';

const useProductListPageHandlers = () => {
  const router = useRouter();
  const { query }: any = useRouter();
  const [sortBy, setSortBy] = useState('latest');

  const handleSortBy = (value: any) => {
    setSortBy(value);
    router.push({
      query: { ...query, sort_by: value, page: 1 },
    });
  };
  const handlePaginationBtn = (pageNo: any) => {
    router.push({
      query: { ...query, page: pageNo + 1 },
    });
  };
  const handleLoadMore = () => {
    const currentPage = Number(query.page) || 1;
    const nextPage = currentPage + 1;
    router.push({
      query: { ...query, page: nextPage },
    });
  };
  return { sortBy, setSortBy, handleSortBy, handlePaginationBtn, handleLoadMore };
};

export default useProductListPageHandlers;
