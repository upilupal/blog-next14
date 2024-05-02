'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutAction } from '@/redux/slice/userSlice';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
  };
  return (
    <nav className="sticky top-0 z-50 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <h1>Logo</h1>

          {Boolean(id) ? (
            <div className="flex items-center gap-8">
              <h3 onClick={() => router.push('/')}>Home</h3>
              <h3 onClick={() => router.push('/write')}>Write</h3>
              <h3 onClick={() => router.push('/profile')}>Profile</h3>
              <h3 onClick={logout}>Logout</h3>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <h3>Home</h3>
              <h3>Write</h3>
              <h3>Login</h3>
              <h3>Register</h3>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
