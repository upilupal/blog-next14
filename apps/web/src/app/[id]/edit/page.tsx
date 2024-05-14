'use client';

import { Formik } from 'formik';
import BlogEditForm from './components/BlogEditForm';
import useGetBlog from '@/hooks/api/blog/useGetBlog';
import useUpdateBlog from '@/hooks/api/blog/useUpdateBlog';
import { getChangedValues } from '@/utils/getChangedValues';
import { useAppSelector } from '@/redux/hooks';
import Unauthorized from '@/components/Unauthorized';

const EditBlog = ({ params }: { params: { id: string } }) => {
    const {id} = useAppSelector((state) => state.user)
  const { blog, isLoading: isLoadingGetBlog } = useGetBlog(Number(params.id));
  const { isLoading, updateBlog } = useUpdateBlog(Number(params.id));

  const initialValues = {
    title: blog?.title || '',
    category: blog?.category || '',
    thumbnail: [],
    description: blog?.description || '',
    content: blog?.content || '',
  };

  if(isLoadingGetBlog) {
    return (
        <div className=' container flex h-screen justify-center px-4 pt-24 text-4xl font-semibold'>
            Loading
        </div>
    )
  }

  if (id !== blog?.userId) {
    return <Unauthorized/>
  }
  return (
    <main className="container mx-auto px-4">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const payload = getChangedValues(values, initialValues);

          if (!payload.thumbnail?.length) {
            delete payload.thumbnail;
          }
          updateBlog(payload);
        }}
        enableReinitialize //untuk mengambil data dari tempat lain
      >
        <BlogEditForm isLoading={isLoading} />
      </Formik>
    </main>
  );
};

export default EditBlog;