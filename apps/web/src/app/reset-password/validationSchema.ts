import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please enter your password')
    .min(8, 'Your password is too short'),
    confirmPassword: Yup.string()
    .required('Please retype your password.')
    .oneOf([Yup.ref('password')], 'Your passwords do not match'),
});
