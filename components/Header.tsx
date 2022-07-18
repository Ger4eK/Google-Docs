import { MenuIcon, SearchIcon } from '@heroicons/react/outline';
import { DocumentTextIcon, ViewGridIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className=' sticky top-0 z-50 flex items-center px-1 sm:px-5 py-1 shadow-md bg-white'>
      <button className='relative menu-hover  text-gray-400'>
        <MenuIcon className=' absolute h-10 w-10 left-4 top-4' />
      </button>
      <div className='flex items-center'>
        <DocumentTextIcon className=' h-12 sm:h-16  text-googleDocs' />
        <h1 className='hidden md:inline text-2xl font-medium  ml-2 text-gray-600 '>
          Docs
        </h1>
      </div>

      <div className='mx-3 md:mx-15 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-400 rounded-lg focus-within:text-gray-600 focus-within:shadow-md'>
        <SearchIcon className='h-8 w-8 text-gray-400' />
        <input
          type='text'
          placeholder='Search'
          className='flex-grow px-5 text-lg bg-transparent outline-none'
        />
      </div>
      <button className='relative hidden md:inline menu-hover text-gray-400'>
        <ViewGridIcon className=' absolute h-10 w-10 left-4 top-4' />
      </button>

      <img
        loading='lazy'
        className='cursor-pointer h-12 w-12 rounded-full ml-2'
        src={session.user?.image}
        alt='Profile Image'
      />
    </div>
  );
};

export default Header;
