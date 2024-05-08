'use client'

import { FC } from "react";
import { Label } from "./ui/label";
import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css'

interface RichTextEditorProps {
    onChange: (value: string) => void;
    value: string;
    isError: boolean;
    label: string;
}

const RichTextEditor:FC<RichTextEditorProps> = ({
    onChange,
    isError,
    label,
    value
}) => {
    const quillModules = {
        toolbar: [[{ header: [1, 2, 3, false] }], ['bold', 'italic']],
      };
      const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'align',
        'color',
        'code-block',
      ];
  return (
    <div className="space-y-1.5">
        <Label className={isError ? 'text-red-500' : ''}>{label}</Label>
        <QuillEditor
            value={value}
            onChange={onChange}
            modules={quillModules}
            formats={quillFormats}
            className="h-[300px] overflow-hidden rounded-md pb-44"
        />
        {isError && (
            <div className="text-xs text-red-500">{label} is required</div>
        )}
    </div>
  )
}

export default RichTextEditor