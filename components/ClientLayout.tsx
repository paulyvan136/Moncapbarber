'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './footer';
import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const hideLayoutOn = ['/login', '/register', '/loading'];
  const isHiddenPath =
    hideLayoutOn.includes(pathname) ||
    pathname.startsWith('/manager') ||
    pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <div className="page-container">
        {!isHiddenPath && <Navbar />}
        <main className="content-wrap">{children}</main>
        {!isHiddenPath && <Footer />}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthProvider>
  );
}
