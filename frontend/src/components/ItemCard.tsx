import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from './ui/Button';
import Input from './ui/Input';

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
  isSelected: boolean;
  onSelect: () => void;
};

export default function ItemCard({
  clothing,
  index,
  isInput,
  isSelected,
  onSelect,
}: ItemCardProps) {
  return (
    <div key={clothing.id} className="group relative aspect-w-1 aspect-h-1">
      <div className="mb-4 h-[200px] w-[200px] overflow-hidden rounded-md">
        {isInput ? (
          <>
            <Input
              id={`clothing-${index}`}
              type="radio"
              inputClassName="peer text-primary border-gray-light border-2 focus:ring-primary focus:ring-2"
              name="clothing"
              value={clothing.id}
              required
                          checked={isSelected}
            onChange={onSelect}
              labelClassName={`group-hover:opacity-75 inline-flex items-center border-gray-light border-2 w-full h-full bg-white rounded-lg cursor-pointer overflow-hidden rounded-md relative`}
              imageSrc={clothing.imageSrc}
              imageAlt={clothing.imageAlt}
            ></Input>
          </>
        ) : (
          <>
            <Button className="absolute top-2 right-2 z-10">
            <XMarkIcon className="w-6 h-6"/>
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
