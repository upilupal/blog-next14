"use client"
import React from 'react'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { HTMLInputTypeAttribute } from 'react'
import { FormikHandlers } from 'formik'

interface FormInputProps {
    name: string;
    placeholder: string;
    label: string;
    type: HTMLInputTypeAttribute;
    value: string;
    isError: boolean;
    error: string | undefined;
    handleChange: FormikHandlers["handleChange"];
    handleBlur: FormikHandlers["handleBlur"];
}

const FormInput: React.FC<FormInputProps> = ({
    name,
    placeholder,
    label,
    type = "text",
    handleChange,
    handleBlur,
    value,
    isError,
    error,
}) => {
    
  return (
    <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor={name}
                    className={
                      isError
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {label}
                  </Label>
                  <Input
                    name={name}
                    placeholder={placeholder}
                    type={type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={value}
                  />
                  {isError ? (
                    <div className="text-xs text-red-500">
                      {error}
                    </div>
                  ) : null}
                </div>
  )
}

export default FormInput