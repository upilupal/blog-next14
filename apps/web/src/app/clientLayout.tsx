'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import StoreProvider from '@/providers/StoreProvider';
import { AuthProvider } from '@/providers/AuthProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbarAndFooter = pathname === '/login' || pathname === '/register';

  return (
    <StoreProvider>
      <AuthProvider>
        {!hideNavbarAndFooter && <Navbar />}
        {children}
        {!hideNavbarAndFooter && <Footer />}
      </AuthProvider>
    </StoreProvider>
  );
}
