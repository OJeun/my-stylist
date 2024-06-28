import { useState } from 'react';
import ItemCard, { ClothingItem } from './ClothingCard';

export default function ItemsGrid() {
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

  return (
    <>
      <div className="mt-6 flex overflow-x-scroll gap-6 max-w-5xl mx-auto">
        {clothings.map((clothing, index) => (
          <ItemCard
            key={clothing.id}
            clothing={clothing}
            index={index}
            selectedClothing={selectedClothing}
            setSelectedClothing={setSelectedClothing}
          />
        ))}
      </div>
    </>
  );
}
