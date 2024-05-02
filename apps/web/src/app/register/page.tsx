'use client';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import React from 'react';
import { validationSchema } from './validationSchema';
import useRegister from '@/hooks/api/auth/useRegister';

const Register: React.FC = () => {
  const {register} = useRegister();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      register(values)
    },
  });

  return (
    <main className="container mx-auto my-10 px-4">
      <div className="flex justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-primary">
              Welcome to Socmed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {/* NAME */}
                <FormInput
                                  name="fullName"
                                  error={formik.errors.fullName}
                                  isError={!!formik.touched.fullName && !!formik.errors.fullName}
                                  handleBlur={formik.handleBlur}
                                  handleChange={formik.handleChange}
                                  placeholder="Name"
                                  type="name"
                                  value={formik.values.fullName} label={''}                />
                {/* NAME END */}

                {/* EMAIL */}
                <FormInput
                                  name="email"
                                  error={formik.errors.email}
                                  isError={!!formik.touched.email && !!formik.errors.email}
                                  handleBlur={formik.handleBlur}
                                  handleChange={formik.handleChange}
                                  placeholder="Email"
                                  type="email"
                                  value={formik.values.email} label={''}                />
                {/* EMAIL END */}

                {/* PASSWORD */}
                <FormInput
                                  name="password"
                                  error={formik.errors.password}
                                  isError={!!formik.touched.password && !!formik.errors.password}
                                  handleBlur={formik.handleBlur}
                                  handleChange={formik.handleChange}
                                  placeholder="Password"
                                  type="password"
                                  value={formik.values.password} label={''}                />
                {/* PASSWORD END */}
              </div>
              <Button className="mt-6 w-full">Register</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Register;
