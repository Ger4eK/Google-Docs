import { useState } from 'react';

interface Props {
  onHide: () => void;
}

const Modal = ({ onHide }: Props) => {
  const [input, setInput] = useState('');
  console.log(input);

  const createDocument = () => {
    return onHide();
  };

  return (
    <div className='   bg-zinc-200 opacity-80 fixed inset-0 z-40   '>
      <div className='flex h-screen justify-center items-center '>
        <div className='flex-col justify-center bg-white py-6 px-[29px] rounded-xl hover:shadow-lg'>
          <div className='flex  text-lg  text-gray-700 mb-6'>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type='text'
              className='outline-none w-full'
              placeholder='Enter name of document...'
              onKeyDown={(e) => e.key === 'Enter' && createDocument()}
            />
          </div>
          <div className='flex justify-center gap-5'>
            <button
              onClick={onHide}
              className=' rounded-md px-6 py-2 text-googleDocs bg-[#e8f0fe] hover:shadow-lg'
            >
              Cancel
            </button>
            <button
              onClick={createDocument}
              className=' rounded-md px-6 py-2 text-white bg-googleDocs hover:shadow-lg'
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
