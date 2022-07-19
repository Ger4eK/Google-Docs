import { DotsVerticalIcon } from '@heroicons/react/outline';
import { FolderIcon } from '@heroicons/react/solid';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import { useSession } from 'next-auth/react';
import Login from '../components/Login';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import Modal from '../components/Modal';
import { db } from '../firebase.config';
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import DocumentRow from '../components/DocumentRow';

const Home: NextPage = () => {
  const { data: session } = useSession();

  if (!session) return <Login />

  const collectionRef = collection(db, 'userDocs', session.user.email, 'docs');
  const [showModal, setShowModal] = useState(false);

  const docsQuery = query(collectionRef, orderBy('timestamp', 'desc'));
  const [snapshot] = useCollection(docsQuery);

  const createDocument = (input: string) => {
    if (!input) return;

    addDoc(collectionRef, { fileName: input, timestamp: serverTimestamp() });

    setShowModal(false);
  };

  const handleOnShowModal = () => {
    setShowModal(true);
  };
  const handleOnHideModal = () => {
    setShowModal(false);
  };

  return (
    <div className=''>
      <Head>
        <title>Google Docs</title>
        <link rel='icon' href='/docs.png' />
      </Head>
      <Header />

      {showModal ? (
        <Modal onHide={handleOnHideModal} createDocument={createDocument} />
      ) : (
        ''
      )}

      <section className='bg-[#F8F9FA] pb-10 px-10'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex items-center justify-between py-6'>
            <h2 className='text-gray-700 text-lg'>Start a new document</h2>
            <button className='relative menu-hover p-3 text-gray-400'>
              <DotsVerticalIcon className='h-8 w-8 text-gray-400' />
            </button>
          </div>
          <div>
            <div
              onClick={handleOnShowModal}
              className='relative h-52 w-40 border-2 hover:border-googleDocs cursor-pointer'
            >
              <Image src='https://links.papareact.com/pju' layout='fill' />
            </div>
            <p className='ml-2 mt-2 font-semibold text-sm text-gray-700'></p>
          </div>
        </div>
      </section>

      <section className=' bg-white px-10 md:px-0'>
        <div className='max-w-3xl mx-auto py-8 text-sm text-gray-600'>
          <div className='flex items-center justify-between pb-5'>
            <h2 className=' font-medium flex-grow'>My Documents</h2>
            <p className=' mr-12'>Date created</p>
            <FolderIcon className='h-8 w-8 text-gray-400 mr-4' />
          </div>
          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
