'use client';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useForgotPassword from '@/hooks/api/auth/useForgotPassword';
import { useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import { Loader2 } from 'lucide-react';

const ForgotPassword = () => {
  const { forgotPassword, isLoading } = useForgotPassword();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
      },
      validationSchema,
      onSubmit: ({ email }) => {
        console.log(email);
        
        forgotPassword(email);
      },
    });

  return (
    <main className="container mx-auto my-10 px-4">
      <div className="flex justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-primary">
              Forgot password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {/* EMAIL */}
                <FormInput
                  name="email"
                  error={errors.email}
                  label="Email"
                  isError={!!touched.email && !!errors.email}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  placeholder="Email"
                  type="email"
                  value={values.email}
                />
                {/* EMAIL END */}
              </div>
              <Button className="mt-6 w-full" disabled={isLoading} type='submit'>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading? "loading" : "Submit"}
                </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ForgotPassword;
