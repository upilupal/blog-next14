'use client';

import Dropzone from '@/components/Dropzone';
import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import PreviewImages from '@/components/PreviewImages';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { IFormCreateBlog } from '@/types/blog.type';
import { useFormikContext } from 'formik';
import { Loader2 } from 'lucide-react';
import { FC } from 'react';

interface BlogEditFormProps {
  isLoading: boolean;
}
const BlogEditForm: FC<BlogEditFormProps> = ({ isLoading }) => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormikContext<IFormCreateBlog>();
  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <FormInput
          name="title"
          type="text"
          label="Title"
          placeholder="Tile"
          value={values.title}
          error={errors.title}
          isError={!!touched.title && !!errors.title}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <FormInput
          name="category"
          type="text"
          label="Category"
          placeholder="Category"
          value={values.category}
          error={errors.category}
          isError={!!touched.category && !!errors.category}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
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
        <RichTextEditor
          onChange={(html: string) => setFieldValue('content', html)}
          label="Content"
          value={values.content}
          isError={Boolean(errors.content)}
        />
        <div className="mb-4 flex justify-end">
          <Button className="mt-6 w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Loading' : 'Submit'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BlogEditForm;