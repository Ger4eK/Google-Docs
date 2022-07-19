import { DocumentTextIcon, UsersIcon } from '@heroicons/react/solid';
import { doc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import { getSession, useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useDocument } from 'react-firebase-hooks/firestore';
import Login from '../../components/Login';
import TextEditor from '../../components/TextEditor';
import { db } from '../../firebase.config';

const Doc = () => {
  const { data: session } = useSession();

  if (!session) return <Login />;

  const router = useRouter();
  const { id } = router.query;

  const [snapshot, loadingSnapshot] = useDocument(
    doc(db, 'userDocs', session.user.email, 'docs', `${id}`)
  );

  return (
    <div>
      <header className='flex justify-between items-center p-2 pb-1'>
        <span onClick={() => router.push('/')} className='cursor-pointer'>
          <DocumentTextIcon className=' h-12 sm:h-16  text-googleDocs' />
        </span>

        <div className='flex-grow px-2'>
          <h2 className='text-2xl font-medium  ml-2 text-gray-600 '>
            {snapshot?.data()?.fileName}
          </h2>
          <div className='flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600'>
            <p className='option'>File</p>
            <p className='option'>Edit</p>
            <p className='option'>View</p>
            <p className='option'>Insert</p>
            <p className='option'>Format</p>
            <p className='option'>Tools</p>
          </div>
        </div>

        <button className=' hidden md:!inline-flex gap-1 rounded-md px-6 py-3 mr-3 text-white font-semibold bg-googleDocs hover:shadow-lg'>
          <UsersIcon className='h-6 w-6' />
          Share
        </button>
        <img
          src={session.user?.image}
          alt='Profile Image'
          className='cursor-pointer h-12 w-12 rounded-full ml-2 mr-3'
        />
      </header>

      <TextEditor />
    </div>
  );
};

export default Doc;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
