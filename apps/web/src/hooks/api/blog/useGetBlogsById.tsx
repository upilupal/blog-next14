'use client';

import { axiosInstance } from '@/lib/axios';
import { Blog } from '@/types/blog.type';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface IGetBlogsQuery extends IPaginationQueries {
  id: number;
}

const useGetBlogsById = (rawQueries: IGetBlogsQuery) => {
  const [data, setData] = useState<Blog[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const queries = useMemo(() => rawQueries, [rawQueries.page,rawQueries.id]);

  const getBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get<{ data: Blog[], meta: IPaginationMeta }>(`/blogs/user`,{
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
  }, [queries]);

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return { data, isLoading, meta, refetch: getBlogs };
};

export default useGetBlogsById;