'use client';

import { Formik } from 'formik';
import BlogEditForm from './components/BlogEditForm';
import useGetBlog from '@/hooks/api/blog/useGetBlog';
import useUpdateBlog from '@/hooks/api/blog/useUpdateBlog';
import { getChangedValues } from '@/utils/getChangedValues';

const EditBlog = ({ params }: { params: { id: string } }) => {
  const { blog } = useGetBlog(Number(params.id));
  const { isLoading, updateBlog } = useUpdateBlog(Number(params.id));

  const initialValues = {
    title: blog?.title || '',
    category: blog?.category || '',
    thumbnail: [],
    description: blog?.description || '',
    content: blog?.content || '',
  };
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