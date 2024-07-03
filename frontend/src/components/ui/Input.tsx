import { ChangeEvent } from "react";

export type InputProps = {
  id: string;
  type: 'text' | 'checkbox' | 'radio';
  label?: string;
  inputClassName?: string;
  labelClassName?: string;
};

type InputComponentProps = InputProps & {
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  id,
  type,
  label,
  inputClassName,
  labelClassName,
  checked,
  onChange,
}: InputComponentProps){
  return (
    <div className="flex items-center">
      <input
        id={id}
        type={type}
        checked={checked}
        onChange={onChange}
        className={`hover:cursor-pointer ` + inputClassName}
      />
      <label
        htmlFor={id}
        className={
          `hover:cursor-pointer font-medium text-gray-900 dark:text-gray-300 ` +
          labelClassName
        }
      >
        {label}
      </label>
    </div>
  );
}
