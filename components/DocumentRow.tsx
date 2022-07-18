import { DocumentIcon, DotsVerticalIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

interface Props {
  id: string;
  fileName: string;
  date: any;
}

const DocumentRow = ({ id, fileName, date }: Props) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className='flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-600 text-sm cursor-pointer'
    >
      <DocumentIcon className='h-10  text-googleDocs' />
      <p className='flex-grow pl-5 w-10 pr-10 truncate'>{fileName}</p>
      <p className='text-sm'>
        {date?.toDate().toLocaleDateString().toString()}
      </p>
      <button className=' ml-5 ease-in duration-[250ms] hover:scale-[.85] p-1 text-gray-400'>
        <DotsVerticalIcon className='h-6 w-6 text-gray-400' />
      </button>
    </div>
  );
};

export default DocumentRow;
