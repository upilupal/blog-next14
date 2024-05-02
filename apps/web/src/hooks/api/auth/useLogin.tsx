'use client';
import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slice/userSlice';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface LoginArgs extends Omit<User, 'id' | 'fullName'> {
  password: string;
}

interface LoginResponse {
  message: string;
  data: User;
  token: string;
}

const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const login = async (payload: LoginArgs) => {
    try {
      const { data } = await axiosInstance.post<LoginResponse>(
        '/auth/login',
        payload,
      );

      dispatch(loginAction(data.data));
      localStorage.setItem('token', data.token);
      router.replace('/');
    } catch (error) {
      if (error instanceof AxiosError) {
          alert(error?.response?.data); // alert bisa diganti toast

      }
    }
  };
  return { login };
};

export default useLogin;
