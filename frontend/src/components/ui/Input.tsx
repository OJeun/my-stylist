import { ComponentPropsWithoutRef } from 'react';

type InputProps = {
  id: string;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  labelProps?: ComponentPropsWithoutRef<'label'>;
  inputProps?: ComponentPropsWithoutRef<'input'>;
};

export default function Input({
  id,
  label,
  labelClassName,
  inputClassName,
  labelProps,
  inputProps,
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClassName} {...labelProps}>
        {label}
      </label>
      <input id={id} className={inputClassName} {...inputProps} />
    </div>
  );
}

