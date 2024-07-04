import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./ui/Button";
import Input from "./ui/Input";

// ItemCard consist of Input componenet or Button Component
export const clothingCategory = [
  'Top',
  'Bottom',
  'Jacket',
  'Shoes',
  'Bags',
  'Accessories',
];

export type ClothingItem = {
  id: number;
  name: string;
  imageSrc: string;
  imageAlt: string;
};

type ItemCardProps = {
  clothing: ClothingItem;
  index: number;
  isInput: boolean;
  selectedClothing?: number | null;
  setSelectedClothing?: (index: number) => void;
};

export default function ItemCard({
  clothing,
  index,
  setSelectedClothing,
  selectedClothing,
  isInput,
}: ItemCardProps) {
  return (
    <div key={clothing.id} className="group relative aspect-w-1 aspect-h-1">
      <div className="mb-4 h-[200px] w-[200px] overflow-hidden rounded-md group-hover:opacity-75">
        {isInput ? (
          <>
          <Input id={`clothing-${index}`} type="radio" inputClassName="hidden peer" name="clothing" value={clothing.id} required
          labelClassName={`inline-flex items-center border-gray-light border-2 peer-checked:border-primary justify-between w-full h-full bg-white rounded-lg cursor-pointer hover:bg-gray-light dark:bg-gray-strong dark:hover:bg-gray overflow-hidden rounded-md bg-gray group-hover:opacity-75 relative`}
          imageSrc={clothing.imageSrc} imageAlt={clothing.imageAlt}
          >
          </Input>
          </>
        ) : (
          <>
            <Button>
            <XMarkIcon className="w-6 h-6" />
            </Button>
          <img
              src={clothing.imageSrc}
              alt={clothing.imageAlt}
              className="w-full h-full object-cover" /></>
        )}
      </div>
    </div>
  );
}
