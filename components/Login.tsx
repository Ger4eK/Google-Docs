import { signIn } from 'next-auth/react';
import Image from 'next/image';

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Image
        src='https://links.papareact.com/1ui'
        height='300'
        width='550'
        objectFit='contain'
      />
      <button
        onClick={signIn}
        className='w-44 mt-10 p-2 text-white font-semibold bg-googleDocs rounded-sm hover:shadow-lg'
      >
        Log in
      </button>
    </div>
  );
};

export default Login;
