import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  Dispatch,
  SetStateAction,
} from "react";
import Input, { InputProps } from "./Input";

type InputGroupProps = {
  inputs: InputProps[];
  selected?: string | string[];
  setSelected?: Dispatch<SetStateAction<string | string[]>>;
} & ComponentPropsWithoutRef<"div">;

export default function InputGroup({
  inputs,
  selected,
  setSelected,
  ...props
}: InputGroupProps) {
  const inputClassName =
    "w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600";
  const labelClassName = "ms-2 pl-2 text-lg";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    if (selected && setSelected && typeof selected === "string") {
      setSelected(id);
    } else if (selected && setSelected) {
      setSelected((prevSelected) =>
        checked
          ? [...(prevSelected as string[]), id]
          : (prevSelected as string[]).filter((item) => item !== id)
      );
    }
  };

  const isChecked = (id: string) => {
    return Array.isArray(selected) ? selected.includes(id) : selected === id;
  };

  return (
    <div {...props}>
      {inputs.map((input) => (
        <div key={input.id}>
          <Input
            inputClassName={inputClassName}
            labelClassName={labelClassName}
            {...input}
            checked={isChecked(input.id)}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
}
