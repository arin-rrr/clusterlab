import '@/app/ui/global.css';
import '@/app/ui/a-tech-page.css'
import { righteous, inter, lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
//import Header from '@/app/(auth)/components/header'
import Footer from '@/app/(auth)/components/footer';

export const dynamic = 'force-dynamic';

export default function A_TechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    {/* <Header /> */}

      <main>{children}</main>

      <Footer />
    </>
  );
}