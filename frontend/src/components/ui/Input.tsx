import { ChangeEvent, ComponentPropsWithoutRef } from 'react';
import { XMarkIcon, XCircleIcon } from "@heroicons/react/24/outline";

export type InputProps = {
  id: string | number;
  type: 'text' | 'checkbox' | 'radio';
  label?: string;
  name?: string;
  inputClassName?: string;
  labelClassName?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  isDefaultImg?: boolean;
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
  isDefaultImg,
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
            {isDefaultImg && (
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
            onChange={onChange}
            {...props}
          />
        </>
      )}
    </>
  );
}
