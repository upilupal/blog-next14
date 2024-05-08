"use client"
import { FormikHandlers } from 'formik'
import React from 'react'
import { Label } from '../components/ui/label'
import { Textarea } from './ui/textarea'

interface FormTextAreaProps {
    name: string;
    placeholder: string;
    label: string;
    value: string;
    isError: boolean;
    error: string | undefined;
    handleChange: FormikHandlers["handleChange"];
    handleBlur: FormikHandlers["handleBlur"];
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
    name,
    placeholder,
    label,
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
                  <Textarea
                    name={name}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={value}
                    style={{resize: 'none'}}
                    rows={4}
                    className={isError ? 'border-red-500' : ''}
                  />
                  {isError ? (
                    <div className="text-xs text-red-500">
                      {error}
                    </div>
                  ) : null}
                </div>
  )
}

export default FormTextArea