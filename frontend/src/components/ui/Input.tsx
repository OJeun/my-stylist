import { ComponentPropsWithoutRef } from 'react';

export type InputProps = {
  id: string;
  type: 'text' | 'checkbox' | 'radio';
  label?: string;
  name?: string;
  inputClassName?: string;
  labelClassName?: string;
  imageSrc?: string;
  imageAlt?: string;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({
  id,
  type,
  label,
  name,
  inputClassName,
  labelClassName,
  imageSrc,
  imageAlt,
  ...props
}: InputProps){
  return (
<>
      <input
        id={id}
        type={type}
        className={`${
          imageSrc ? 'absolute top-2 right-2 z-10' : ''
        } ${inputClassName}`}
        name={name}
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
        {imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        )}
      </label>
</>
  );
}
