'use client';

import { FC } from 'react';
import { Label } from './ui/label';
import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  onChange: (value: string) => void;
  value: string;
  isError: boolean;
  error: string | undefined;
  label: string;
}

const RichTextEditor: FC<RichTextEditorProps> = ({
  onChange,
  isError,
  label,
  value,
  error,
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

  const handleChange = (content: string) => {
    onChange(content);
  };
  return (
    <div className="space-y-1.5 flex flex-col">
      <Label className={isError ? 'text-red-500' : ''}>{label}</Label>
      <QuillEditor
        value={value}
        onChange={handleChange}
        modules={quillModules}
        formats={quillFormats}
        className="h-[300px] overflow-hidden pb-12 rounded-md"
      />
      <div className='flex justify-between w-full'>
      {isError && <div className="text-xs text-red-500">{error}</div>}
      <div className="flex justify-between text-xs">
        <span className={value.length < 1500 ? 'text-red-500' : ''}>
          {value.length < 1500
            ? `Minimum 1500 characters required. Current: ${value.length}`
            : `Character count: ${value.length}`}
        </span>
 
      </div>

      </div>
    </div>
  );
};

export default RichTextEditor;
