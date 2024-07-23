import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { ComponentPropsWithoutRef } from "react";
import { ClosetItem } from "../stores/features/closetItems";
import { useAppSelector } from "../stores/store";

// ItemCard consist of Input componenet or Button Component
export const clothingCategory = [
  "Top",
  "Bottom",
  "Outer",
  "Shoes",
  "Bag",
  "Accessories",
];


type ItemCardProps = {
  clothing: ClosetItem;
  index: number;
  isInput: boolean;
  isSelected: boolean;
  inputClassName?: string;
  labelClassName?: string;
  imageClassName?: string;
  onDelete?: (category: string, deletedItemId: string) => void; 
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
  imageClassName,
  onDelete,
  onSelect,
}: ItemCardProps) {

  const fetchedCategory = useAppSelector(
    (state) => state.category.category
  );

  const handleDelete = () => {

    if (onDelete) onDelete(fetchedCategory, clothing.id); // Call onDelete if defined
    console.log("deleted", clothing)
  };
  return (
    <div key={clothing.id} className="group relative aspect-w-1 aspect-h-1">
      <div className="mb-2 sm:h-36 md:h-40 lg:h-44 xl:h-48 w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 overflow-hidden rounded-md">
        {isInput ? (
          <>
            <Input
              id={`clothing-${index}`}
              type="radio"
              inputClassName={inputClassName}
              name="clothing"
              value={clothing.imageSrc}
              required
              checked={isSelected}
              onChange={onSelect}
              labelClassName={labelClassName}
              imageSrc={clothing.imageSrc}
              imageAlt={`index ${clothing.id}`}
              imageClassName={imageClassName}
            ></Input>
          </>
        ) : (
          <>
            <Button className="absolute top-2 right-2 z-10" onClick={handleDelete}>
              <XMarkIcon className="w-6 h-6" />
            </Button>
            <img
              src={clothing.imageSrc}
              alt={`index ${clothing.id}`}
              className="w-full h-full object-cover"
            />
          </>
        )}
      </div>
    </div>
  );
}
