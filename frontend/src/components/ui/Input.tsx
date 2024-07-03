import { ComponentPropsWithoutRef } from 'react';

export type InputProps = {
  id: string;
  type: 'text' | 'checkbox' | 'radio';
  label?: string;
  inputClassName?: string;
  labelClassName?: string;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({
  id,
  type,
  label,
  inputClassName,
  labelClassName,
  ...props
}: InputProps){
  return (
    <p>
      <input
        id={id}
        type={type}
        className={`hover:cursor-pointer ` + inputClassName}
        {...props}
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
      </p>
  );
}
