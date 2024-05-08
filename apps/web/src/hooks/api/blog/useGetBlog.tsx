'use client';
import { axiosInstance } from '@/lib/axios';
import { Blog } from '@/types/blog.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const useGetBlog = (id: number) => {
  const [data, setData] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getBlog = async () => {
    try {
      const { data } = await axiosInstance.get<Blog>(`/blogs/${id}`);
      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        // TODO : replace console.log with toast
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);
  return { blog: data, isLoading, refetch: getBlog };
};

export default useGetBlog;
