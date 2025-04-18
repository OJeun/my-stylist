import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Input from "./ui/Input";
import { ComponentPropsWithoutRef } from "react";
import { ClosetItem } from "../stores/features/closetItems";
import { useAppSelector } from "../stores/store";
import { isDefaultImg, setDefaultImg } from "../utils/api/image";

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
  onSelect: () => void;
  onEdit?: (item: ClosetItem) => void;
  handleReplaceButton?: (item: ClosetItem) => void;
} & ComponentPropsWithoutRef<"input">;

const baseInputClass =
  "group-hover:opacity-75 inline-flex items-center border-gray-light border-2 w-full h-full bg-white rounded-lg cursor-pointer overflow-hidden rounded-md relative";

export default function ItemCard({
  clothing,
  index,
  isInput,
  isSelected,
  inputClassName,
  labelClassName,
  imageClassName,
  handleReplaceButton,
  onSelect,
  onEdit,
}: ItemCardProps) {
  const fetchedCategory = useAppSelector((state) => state.category.category);

  const handleEdit = () => {
    if (onEdit) onEdit(clothing);
    console.log('Editing a cloth:', clothing);
  };

  return (
    <div
      key={clothing.clothId}
      className="group relative aspect-w-1 aspect-h-1"
      onClick={!isInput ? handleEdit : undefined}
    >
      <div className="h-38 sm:h-338 md:h-40 lg:h-44 xl:h-48 w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 overflow-hidden rounded-md">
        {isInput ? (
          <>
            <Input
              id={`clothing-${index}`}
              type="radio"
              inputClassName={inputClassName}
              name="clothing"
              value={clothing.imgSrc}
              required
              checked={isSelected}
              onChange={onSelect}
              labelClassName={labelClassName}
              isDefaultImg={isDefaultImg(clothing)}
              imageSrc={setDefaultImg(clothing)}
              imageAlt={`index ${clothing.clothId}`}
              imageClassName={imageClassName}
              cloth={clothing}
              handleReplaceButton={handleReplaceButton}
            ></Input>
          </>
        ) : (
          <>
            <div className="relative w-full h-full cursor-pointer group-hover:opacity-75">
              <button
                className="absolute top-0 right-0 z-10 rounded-full p-1"
              >
                <PencilSquareIcon className="w-6 h-6 text-gray" />
              </button>
              <img
                src={clothing.imgSrc}
                alt={`index ${clothing.clothId}`}
                className={imageClassName}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
