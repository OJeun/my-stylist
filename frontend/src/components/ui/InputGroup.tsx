import { ChangeEvent, ComponentPropsWithoutRef } from 'react';
import Input, { InputProps } from './Input';

type InputGroupProps = {
  inputs: InputProps[];
  selected: string | null;
  setSelected: (selected: string) => void;
} & ComponentPropsWithoutRef<'div'>;

export default function InputGroup({
  inputs,
  selected,
  setSelected,
  ...props
}: InputGroupProps) {
  const inputClassName =
    'w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600';
  const labelClassName = 'ms-2 pl-2 text-lg';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setSelected(id);
  };

  return (
    <div {...props}>
      {inputs.map((input) => (
        <div>
        <Input
          key={input.id}
          inputClassName={inputClassName}
          labelClassName={labelClassName}
          {...input}
          checked={selected === input.id}
          onChange={handleChange}
        />
        </div>
      ))}
    </div>
  );
}
