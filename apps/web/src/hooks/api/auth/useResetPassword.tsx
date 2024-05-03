'use client';
import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ResetPasswordResponse {
  message: string;
}

const useResetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async (password: string, token: string) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.patch<ResetPasswordResponse>(
        '/auth/reset-password',
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );


      alert(data.message);
      router.replace('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error?.response?.data); // alert bisa diganti toast
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { resetPassword, isLoading };
};

export default useResetPassword;
