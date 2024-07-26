import { HTMLInputTypeAttribute } from 'react';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface CategoryInputProps {
  name: string;
  placeholder: string;
  label: string;
  type: HTMLInputTypeAttribute;
  value: string;
  isError: boolean;
  error: string | undefined;

  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const categories = [
  {
    value: "food",
    name: "Food"
  },
  {
    value: "sport",
    name: "Sport"
  },
  {
    value: "lifestyle",
    name: "Lifestyle"
  }
];


const CategoryInput: React.FC<CategoryInputProps> = ({
  name,
  label,
  value,
  isError,
  error,
  setFieldValue
}) => {
  const handleSelectChange = (value: string) => {
    setFieldValue(name, value);
  };
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name} className={isError ? 'text-red-500' : ''}>
        {label}
      </Label>
      <Select onValueChange={handleSelectChange} value={value}>
        <SelectTrigger
          id="category"
          className="rounded-md border p-2 text-sm text-black/70"
        >
          <SelectValue placeholder="Select category..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
          <SelectLabel>Category</SelectLabel>
            {categories.map((category, index) => (
              <SelectItem key={index} value={category.value}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {isError ? <div className="text-xs text-red-500">{error}</div> : null}
    </div>
  );
};

export default CategoryInput;

