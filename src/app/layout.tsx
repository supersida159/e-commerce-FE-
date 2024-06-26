import CartProvider from '@/lib/provider/CartProvide';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Footer from './components/footer/Footer';
import NavBar from './components/nav/NavBar';
import './globals.css';

const poppins = Poppins({ subsets: ['latin-ext'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff'
            }
          }}
        />
        <CartProvider>
          {/* <ChatBox messages={[]} /> */}
          <div className="flex min-h-screen flex-col">
            <NavBar />
            <main className=" flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
