import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  Dispatch,
  SetStateAction,
} from "react";
import Input, { InputProps } from "./Input";
import { ClosetItem } from "../../stores/features/closetItems";

type InputGroupProps = {
  inputs?: InputProps[];
  generatedItems?: ClosetItem[];
  selected?: string | string[];
  setSelected?: Dispatch<SetStateAction<string | string[]>>;
  singleSelection?: boolean;
} & ComponentPropsWithoutRef<"div">;

export default function InputGroup({
  inputs,
  selected,
  setSelected,
  singleSelection,
  generatedItems,
  ...props
}: InputGroupProps) {
  const inputClassName =
    "sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600";
  const labelClassName = "ms-1 pl-2 text-s sm:text-s md:text-lg lg:text-lg font-medium";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    if (singleSelection && setSelected) {
      setSelected(id);
    } else if (setSelected) {
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
      {inputs && (
        inputs.map((input) => (
          <div key={input.id}>
            <Input
              inputClassName={inputClassName}
              labelClassName={labelClassName}
              {...input}
              checked={isChecked(input.id)}
              onChange={handleChange}
            />
          </div>
        ))
      )}
      {generatedItems && (
        generatedItems.map((item) => (
          <Input
              type="radio"
              id={String(item.clothId)}
              imageSrc={item.imgSrc}
              imageAlt={`image ${item.clothId}`}
              inputClassName={`hidden ${inputClassName}`}
              labelClassName={labelClassName}
            />
        )
        )
      )}
      
   
    </div>
  );
}
