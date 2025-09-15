// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout';
import 'bootstrap/dist/css/bootstrap.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Moncap Barber - Gestion de Salons de Coiffure',
  description: 'Plateforme de gestion pour salons de coiffure',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
        <script src="/js/bootstrap.bundle.js" defer></script>
      </body>
    </html>
  );
}
