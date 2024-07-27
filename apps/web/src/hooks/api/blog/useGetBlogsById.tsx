'use client';

import { axiosInstance } from '@/lib/axios';
import { Blog } from '@/types/blog.type';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';

interface IGetBlogsQuery extends IPaginationQueries {
  id: number;
}

const useGetBlogsById = (queries: IGetBlogsQuery) => {
  const [data, setData] = useState<Blog[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBlogs = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(`/blogs/user`,{
        params: queries,
      });

      setData(data.data);
      setMeta(data.meta)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [queries?.page, queries.id]);

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return { data, isLoading, meta, refetch: getBlogs };
};

export default useGetBlogsById;