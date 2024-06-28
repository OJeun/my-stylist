import ItemsGrid from '../components/ItemsGrid';

export default function OutfitGenerator() {
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
          <div className="flex">
            <div className="flex items-center me-4">
              {/* <input
                id="red-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="red-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Red
              </label> */}
              <input
                id="top-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 accent-primary-strong text-primary bg-gray-light border-gray rounded"
              />
              <label
                htmlFor="bottom-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                TOP
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
