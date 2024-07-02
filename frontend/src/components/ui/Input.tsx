export type InputProps = {
  id: string;
  type: 'text' | 'checkbox' | 'radio';
  label?: string;
  // value: string;
  // name: string;
  inputClassName?: string;
  labelClassName?: string;
  // onChange: () => void;
};

export default function Input({
  id,
  type,
  label,
  inputClassName,
  labelClassName,
}: InputProps) {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type={type}
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
