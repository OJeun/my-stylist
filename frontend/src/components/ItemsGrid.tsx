import { ComponentPropsWithoutRef, useState } from "react";
import ItemCard, { ClothingItem } from "./ItemCard";

type ClothingListProps = {
  isInput: boolean;
  onSelectItem?: (item: ClothingItem) => void;
  clothingImages?: string[];
  inputClassName?: string;
  labelClassName?: string;
  imageClassName?: string;
} & ComponentPropsWithoutRef<"input">;

export type ImageAndID = {
  id: string | number;
  imageSrc: string;
  imageAlt: string;
};

export default function ItemsGrid({
  isInput,
  onSelectItem,
  clothingImages,
  inputClassName,
  labelClassName,
  imageClassName,
}: ClothingListProps) {
  const [clothings, setClothings] = useState<ClothingItem[]>([
    {
      id: 1,
      name: "Basic Tee",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
    },
    {
      id: 2,
      name: "Pretty Tee",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
    },
    {
      id: 3,
      name: "Pretty Tee",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
    },
    {
      id: 4,
      name: "Pretty Tee",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
    },
    {
      id: 5,
      name: "Pretty Tee",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
    },
    {
      id: 6,
      name: "Pretty Tee",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
    },
  ]);

  const [selectedClothing, setSelectedClothing] = useState<number | null>(null);

  const handleSelectClothing = (index: number) => {
    setSelectedClothing(index);
    if (onSelectItem) onSelectItem(clothings[index]);
  };

  console.log(clothingImages)
  const clothingList = clothingImages
    ? clothingImages.map((image, index) => ({
        id: index + 1,
        imageSrc: image,
        imageAlt: `index ${index}`
      }))
    : clothings;

    console.log(clothingList)

    return (
      <>
        <div className="mt-6 flex overflow-x-scroll gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 mx-auto max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-2xl xl:max-w-3xl">
          {clothingList.map((items, index) => (
            <ItemCard
              key={index}
              inputClassName={inputClassName}
              labelClassName={labelClassName}
              clothing={items}
              index={index}
              isSelected={selectedClothing === index}
              onSelect={() => handleSelectClothing(index)}
              isInput={isInput}
              imageClassName={imageClassName}
            />
          ))}
        </div>
      </>
    );
}
