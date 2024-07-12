import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { ComponentPropsWithoutRef } from "react";
import { ImageAndID } from "./ItemsGrid";

// ItemCard consist of Input componenet or Button Component
export const clothingCategory = [
  "Top",
  "Bottom",
  "Jacket",
  "Shoes",
  "Bags",
  "Accessories",
];

export type ClothingItem = {
  id: number;
  name: string;
  imageSrc: string;
  imageAlt: string;
};

type ItemCardProps = {
  clothing: ImageAndID;
  index: number;
  isInput: boolean;
  isSelected: boolean;
  inputClassName?: string;
  labelClassName?: string;
  onSelect: () => void;
} & ComponentPropsWithoutRef<"input">;

const baseInputClass = "group-hover:opacity-75 inline-flex items-center border-gray-light border-2 w-full h-full bg-white rounded-lg cursor-pointer overflow-hidden rounded-md relative"

export default function ItemCard({
  clothing,
  index,
  isInput,
  isSelected,
  inputClassName,
  labelClassName,
  onSelect,
}: ItemCardProps) {
  return (
    <div key={clothing.id} className="group relative aspect-w-1 aspect-h-1">
      <div className="mb-4 sm:h-36 md:h-40 lg:h-44 xl:h-48 w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 overflow-hidden rounded-md">
        {isInput ? (
          <>
            <Input
              id={`clothing-${index}`}
              type="radio"
              inputClassName={inputClassName}
              name="clothing"
              value={clothing.id}
              required
              checked={isSelected}
              onChange={onSelect}
              labelClassName={labelClassName}
              imageSrc={clothing.imageSrc}
              imageAlt={clothing.imageAlt}
            ></Input>
          </>
        ) : (
          <>
            <Button className="absolute top-2 right-2 z-10">
              <XMarkIcon className="w-6 h-6" />
            </Button>
            <img
              src={clothing.imageSrc}
              alt={clothing.imageAlt}
              className="w-full h-full object-cover"
            />
          </>
        )}
      </div>
    </div>
  );
}
