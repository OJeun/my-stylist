import { ComponentPropsWithoutRef, useState } from "react";
import { ClosetItem } from "../stores/features/closetItems";
import ItemCard from "./ItemCard";

type ClothingListProps = {
  isInput: boolean;
  onSelectItem?: (item: ClosetItem) => void;
  clothingItems?: ClosetItem[];
  inputClassName?: string;
  labelClassName?: string;
  imageClassName?: string;
  onDelete?: (category: string, deletedItemId: string) => void; 
  onScrollLeft?: () => void;
  onScrollRight?: () => void;
} & ComponentPropsWithoutRef<"input">;


export default function ItemsGrid({
  isInput,
  onSelectItem,
  onDelete,
  clothingItems,
  inputClassName,
  labelClassName,
  imageClassName,
}: ClothingListProps) {
  const [clothings, setClothings] = useState<ClosetItem[]>([
    {
      id: "1",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      season: "summer",
      category: "top"
    },
    {
      id: "2",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      season: "summer",
      category: "top"
    },
    {
      id: "3",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      season: "summer",
      category: "top"
    },
    {
      id: "4",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      season: "summer",
      category: "top"
    },
    {
      id: "5",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      season: "summer",
      category: "top"
    },
    {
      id: "6",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      season: "summer",
      category: "top"
    },
  ]);

  const [selectedClothing, setSelectedClothing] = useState<number | null>(null);

  const handleSelectClothing = (index: number) => {
    setSelectedClothing(index);
    console.log(index)
    if (onSelectItem) onSelectItem(clothings[index]);
  };

  const clothingList = clothingItems
    ? clothingItems.map((item, index) => ({
        ...item,
        imageAlt: `index ${item.id}`
      }))
    : clothings;

    return (

<div className="flex items-center mb-4">

        <div className="flex overflow-x-scroll gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 mx-auto max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-2xl xl:max-w-2xl">
          {clothingList.map((items, index) => (
            <ItemCard
              key={index}
              inputClassName={inputClassName}
              labelClassName={labelClassName}
              clothing={items}
              index={index}
              isSelected={selectedClothing === index}
              onSelect={() => handleSelectClothing(index)}
              onDelete={onDelete} 
              isInput={isInput}
              imageClassName={imageClassName}
            />
          ))}
        </div>
        </div>
    );
}
