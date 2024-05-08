import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  category: Yup.string().required('Category is required'),
  thumbnail: Yup.array().min(1),
  description: Yup.string().required('Description is required'),
  content: Yup.string().required('Content is required'),
});
