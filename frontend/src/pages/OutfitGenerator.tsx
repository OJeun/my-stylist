import ItemsGrid from '../components/ItemsGrid';
import Input from '../components/ui/Input';

export default function OutfitGenerator() {
  const inputClassName =
    'w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600';
  const labelClassName = 'ms-2 text-lg';

  return (
    <div>
      <h1>Outfit Suggestion</h1>
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

        {/* divider line */}
        <div className="inline-block h-[307px] min-h-[1em] w-0.5 mx-8 self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>

        {/* item card */}
        <div className="mx-5">
          <h3 className="mb-5 text-lg font-medium text-gray-strong dark:text-white">
            Select the type of clothes you want to match!
          </h3>

          <ItemsGrid />

          <h3 className="my-5 text-lg font-medium text-gray-strong dark:text-white">
            Which type of clothing would you like to match?
          </h3>

          {/* Category checkboxes */}

          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-x-20 gap-y-5">
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
        </div>
      </div>
    </div>
  );
}
