import { ChangeEvent, ComponentPropsWithoutRef } from 'react';
import { onChange } from 'react-toastify/dist/core/store';

export type InputProps = {
  id: string;
  type: 'text' | 'checkbox' | 'radio';
  label?: string;
  name?: string;
  inputClassName?: string;
  labelClassName?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({
  id,
  type,
  label,
  name,
  inputClassName,
  labelClassName,
  imageClassName,
  imageSrc,
  imageAlt,
  onChange,
  ...props
}: InputProps) {
  return (
    <>
      {type !== 'text' ? (
        <>
          <input
            id={id}
            type={type}
            className={`${
              imageSrc ? 'absolute top-2 right-2 z-10' : ''
            } ${inputClassName}`}
            name={name}
            onChange={onChange}
            {...props}
          />
          <label
            htmlFor={id}
            className={
              `font-medium text-gray-strong` +
              labelClassName
            }
          >
            {label}
            {imageSrc && (
              <img
                src={imageSrc}
                alt={imageAlt}
                className={imageClassName}
                
              />
            )}
          </label>
        </>
      ) : (
        <>
          <label
            htmlFor={id}
            className={
              `font-medium text-gray-strong` +
              labelClassName
            }
          >
            {label}
          </label>
          <input
            id={id}
            type={type}
            className={`border border-gray-light focus:ring-gray-light focus:border-gray-light text-gray-strong rounded-lg ${inputClassName}`}
            name={name}
            {...props}
          />
        </>
      )}
    </>
  );
}
