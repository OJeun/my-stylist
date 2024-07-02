import ItemsGrid from '../components/ItemsGrid';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useState } from 'react';
import { clothingCategory } from '../components/ItemCard';

export default function OutfitGenerator() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const inputClassName =
    'w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600';
  const labelClassName = 'ms-2 text-lg';

  return (
    <div>
      <h1>Outfit Suggestion</h1>
      <div className="flex flex-1">
        <div className="pr-6">
          <ul className="text-xl tracking-tight text-gray-900">
            {clothingCategory.map((item) => (
              <li
                key={item}
                className={`${
                  selectedItem === item ? 'text-primary' : ''
                } hover:cursor-pointer`}
                onClick={() => {
                  if (selectedItem !== item) {
                    setSelectedItem(item);
                  }
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* divider line */}
        <div className="inline-block h-[307px] min-h-[1em] w-0.5 mx-8 self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>

        {/* item card */}
        <div className="mx-5">
          <h3 className="mb-5 text-lg font-medium text-gray-strong dark:text-white">
            Select the type of clothes you want to match!
          </h3>
          <ItemsGrid isInput={true} />
          <h3 className="my-5 text-lg font-medium text-gray-strong dark:text-white">
            Which type of clothing would you like to match?
          </h3>

          {/* Category checkboxes */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5">
              <Input
                id="checkbox"
                type="checkbox"
                label="TOP"
                inputClassName={inputClassName}
                labelClassName={labelClassName}
              />
              <Input
                id="bottom-checkbox"
                type="checkbox"
                label="BOTTOM"
                inputClassName={inputClassName}
                labelClassName={labelClassName}
              />
              <Input
                id="outer-checkbox"
                type="checkbox"
                label="OUTER"
                inputClassName={inputClassName}
                labelClassName={labelClassName}
              />
              <Input
                id="shose-checkbox"
                type="checkbox"
                label="SHOES"
                inputClassName={inputClassName}
                labelClassName={labelClassName}
              />
              <Input
                id="bag-checkbox"
                type="checkbox"
                label="BAG"
                inputClassName={inputClassName}
                labelClassName={labelClassName}
              />
              <Input
                id="accessory-checkbox"
                type="checkbox"
                label="ACCESSORY"
                inputClassName={inputClassName}
                labelClassName={labelClassName}
              />
            </div>
          </div>
          <Button color="secondary" additionalclassname="w-80 m-5">
            Get Styled!
          </Button>
        </div>
      </div>
    </div>
  );
}
