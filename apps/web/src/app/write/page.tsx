'use client';

import Dropzone from '@/components/Dropzone';
import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import PreviewImages from '@/components/PreviewImages';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import useCreateBlog from '@/hooks/api/blog/useCreateBlog';
import { useAppSelector } from '@/redux/hooks';
import { IFormCreateBlog } from '@/types/blog.type';
import { useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import AuthGuard from '@/hoc/AuthGuard';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CategoryInput from '@/components/CategoryInput';
const Write = () => {
  const { createBlog } = useCreateBlog();
  const { id } = useAppSelector((state) => state.user);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormik<IFormCreateBlog>({
    initialValues: {
      title: '',
      category: '',
      thumbnail: [],
      description: '',
      content: '',
    },
    validationSchema,
    onSubmit: (values) => {
      createBlog({ ...values, userId: id });
    },
    // validateOnChange: true, // Validate on each change
    // validateOnBlur: true, // Validate on blur
  });

 

  return (
    <main className="container mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          {/* TITLE INPUT */}
          <FormInput
            name="title"
            type="text"
            label="Title"
            placeholder="Title"
            value={values.title}
            error={errors.title}
            isError={!!touched.title && !!errors.title}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />

          {/* CATEGORY INPUT */}
          <CategoryInput
            name="category"
            type="text"
            label="Category"
            placeholder="Category"
            value={values.category}
            error={errors.category}
            isError={!!touched.category && !!errors.category}
            setFieldValue={setFieldValue}
            />

          {/* DESCRIPTION INPUT */}
          <FormTextArea
            name="description"
            label="Description"
            placeholder="Description"
            value={values.description}
            error={errors.description}
            isError={!!touched.description && !!errors.description}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />

          {/* THUMBNAIL PREVIEW AND INPUT */}
          <PreviewImages
            fileImages={values.thumbnail}
            onRemoveImage={(idx: number) =>
              setFieldValue('thumbnail', values.thumbnail?.toSpliced(idx, 1))
            }
          />
          <Dropzone
            isError={Boolean(errors.thumbnail)}
            label="Thumbnail"
            onDrop={(files) =>
              setFieldValue('thumbnail', [
                ...values.thumbnail,
                ...files.map((file) => file),
              ])
            }
          />

          {/* CONTENT TEXT EDITOR */}
          <RichTextEditor
            onChange={(html: string) => setFieldValue('content', html)}
            label="Content"
            value={values.content}
            error={errors.content}
            isError={Boolean(errors.content)}
          />

          {/* SUBMIT BUTTON */}
          <div className="mb-4 flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default AuthGuard(Write);
