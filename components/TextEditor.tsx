import { EditorState } from 'draft-js';
import { doc, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { db } from '../firebase.config';
import { convertFromRaw, convertToRaw } from 'draft-js';
import { useDocument } from 'react-firebase-hooks/firestore';
//! робимо так шоб імпортувалось тільки на клієнтській частині
const Editor: any = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  { ssr: false }
);

const TextEditor = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { id } = router.query;

  const collectionRef = doc(
    db,
    'userDocs',
    session.user.email,
    'docs',
    `${id}`
  );

  const [snapshot] = useDocument(collectionRef);

  const [editorState, setEditorState] = useState<any>(null);

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      );
    }
  }, [snapshot]);

  if (editorState)
    setDoc(
      collectionRef,
      {
        editorState: convertToRaw(editorState.getCurrentContent()),
      },
      { merge: true }
    );

  return (
    <div className='bg-[#F8F9FA] min-h-screen pb-16'>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName='flex sticky top-0 z-50 !justify-center mx-auto'
        editorClassName='mt-6 p-10 bg-white shadow-lg max-w-4xl mx-auto mb-12 border '
      />
    </div>
  );
};

export default TextEditor;
