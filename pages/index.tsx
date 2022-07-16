import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <div className=''>
      <Head>
        <title>Google Docs</title>
        <link rel='icon' href='/docs.png' />
      </Head>
      <Header />
    </div>
  );
};

export default Home;
