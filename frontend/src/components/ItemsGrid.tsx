export default function ItemsGrid() {
  const clothings = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 2,
      name: 'Pretty Tee',
      href: '#',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 3,
      name: 'Pretty Tee',
      href: '#',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 3,
      name: 'Pretty Tee',
      href: '#',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 3,
      name: 'Pretty Tee',
      href: '#',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 3,
      name: 'Pretty Tee',
      href: '#',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
  ];

  return (
    <div className="flex flex-1">
      <div className="pr-6">
        <ul className="text-xl tracking-tight text-gray-900">
          <li>Top</li>
          <li>Bottom</li>
          <li>Jacket</li>
          <li>Shoes</li>
          <li>Bags</li>
          <li>Accessories</li>
        </ul>
      </div>
      <div className="inline-block h-[250px] min-h-[1em] w-0.5 self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
      <div className="mx-5">
        {/* <h2 className="text-xl font-bold tracking-tight text-gray-900 pl-6">
          Select the type of clothes you want to match!
        </h2> */}

        <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
          Select the type of clothes you want to match!
        </h3>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {clothings.map((clothing) => (
            <div key={clothing.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-auto">
                <div className="size-64 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                  <input
                    type="checkbox"
                    className="absolute top-0 right-0 m-1 accent-red-500"
                  />
                  <img
                    src={clothing.imageSrc}
                    alt={clothing.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
