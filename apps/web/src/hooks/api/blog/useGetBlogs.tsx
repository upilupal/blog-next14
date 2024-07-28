'use client';

import { axiosInstance } from '@/lib/axios';
import { Blog } from '@/types/blog.type';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { useCallback, useEffect, useState, useMemo } from 'react';

interface IGetBlogsQuery extends IPaginationQueries {
  search?: string;
  userId?: number;
}

const useGetBlogs = (queries: IGetBlogsQuery) => {
  const [data, setData] = useState<Blog[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Memoize queries to avoid unnecessary recalculations
 

  const getBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get<{ data: Blog[], meta: IPaginationMeta }>('/blogs', {
        params: queries,
      });

      setData(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [queries.page, queries.search, queries.userId]);

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return { data, meta, isLoading };
};

export default useGetBlogs;
