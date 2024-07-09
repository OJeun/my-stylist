import { useState } from 'react';
import ItemCard, { ClothingItem } from './ItemCard';

type ClothingListProps = {
  isInput: boolean;
  onSelectItem?: (item: ClothingItem) => void; 
};

export default function ItemsGrid({ isInput, onSelectItem }: ClothingListProps) {
    const [clothings, setClothings] = useState<ClothingItem[]>([
    {
      id: 1,
      name: 'Basic Tee',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
    },
    {
      id: 2,
      name: 'Pretty Tee',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
    },
    {
      id: 3,
      name: 'Pretty Tee',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
    },
    {
      id: 4,
      name: 'Pretty Tee',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
    },
    {
      id: 5,
      name: 'Pretty Tee',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
    },
    {
      id: 6,
      name: 'Pretty Tee',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
    },
  ]);

  const [selectedClothing, setSelectedClothing] = useState<number | null>(null);

  const handleSelectClothing = (index: number) => {
    setSelectedClothing(index);
    if (onSelectItem)
      onSelectItem(clothings[index])
  };
  


  return (
    <>
       <div className="mt-6 flex overflow-x-scroll gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 mx-auto max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-2xl xl:max-w-2xl">
        {clothings.map((clothing, index) => (
          <ItemCard
            key={clothing.id}
            clothing={clothing}
            index={index}
            isSelected={selectedClothing === index}
            onSelect={() => handleSelectClothing(index)}
            isInput={isInput}
          />
        ))}
      </div>
    </>
  );
}
