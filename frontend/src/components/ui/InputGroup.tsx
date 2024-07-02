import Input, { InputProps } from './Input';

type InputGroupProps = {
  inputs: InputProps[];
};

export default function InputGroup({ inputs }: InputGroupProps) {
  const inputClassName =
    'w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600';
  const labelClassName = 'ms-2 text-lg';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5">
      {inputs.map((inputProps, index) => (
        <Input
          key={index}
          inputClassName={inputClassName}
          labelClassName={labelClassName}
          {...inputProps}
        />
      ))}
    </div>
  );
}
