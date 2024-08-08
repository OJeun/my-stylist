import { ChangeEvent, ComponentPropsWithoutRef } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { ClosetItem } from "../../stores/features/closetItems";

export type InputProps = {
  id: string | number;
  type: "text" | "checkbox" | "radio";
  label?: string;
  name?: string;
  inputClassName?: string;
  labelClassName?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  isDefaultImg?: boolean;
  cloth?: ClosetItem;
  handleReplaceButton?: (item: ClosetItem) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & ComponentPropsWithoutRef<"input">;

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
  cloth,
  onChange,
  handleReplaceButton,
  ...props
}: InputProps) {
  return (
    <>
      {type !== "text" ? (
        <>
          <input
            id={id}
            type={type}
            className={`${
              imageSrc ? "absolute top-2 right-2 z-10" : ""
            } ${inputClassName}`}
            name={name}
            onChange={onChange}
            {...props}
          />
          <label
            htmlFor={id}
            className={`font-medium text-gray-strong` + labelClassName}
          >
            {label}
            {imageSrc && (
              <img src={imageSrc} alt={imageAlt} className={imageClassName} />
            )}
            {isDefaultImg && (
              <Button
                className="absolute m-1 md:m-2 -top-0 -right-0 md:-top-0 md:-right-0 z-30 text-color-primary"
                onClick={() =>
                  cloth && handleReplaceButton && handleReplaceButton(cloth)
                }
              >
                <ArrowPathIcon className="w-4 h-4 md:w-5 md:h-5 text-gray" />
              </Button>
            )}
          </label>
        </>
      ) : (
        <>
          <label
            htmlFor={id}
            className={`font-medium text-gray-strong` + labelClassName}
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
