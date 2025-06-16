import Navbar from './Navbar';
import Head from 'next/head';
import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>EcoBiblion Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="layout-container">
        <Image
                src="/ecobiblion.jpg"
                alt="EcoArt Blog"
                width={120}
                height={120}
                priority
              />
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  );
}
