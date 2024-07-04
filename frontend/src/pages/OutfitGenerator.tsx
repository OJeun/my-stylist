import ItemsGrid from "../components/ItemsGrid";
import Button from "../components/ui/Button";
import { InputProps } from "../components/ui/Input";
import { useState } from "react";
import { clothingCategory } from "../components/ItemCard";
import InputGroup from "../components/ui/InputGroup";

export const categories: InputProps[] = [
  { id: "checkbox", type: "checkbox", label: "TOP" },
  { id: "bottom-checkbox", type: "checkbox", label: "BOTTOM" },
  { id: "outer-checkbox", type: "checkbox", label: "OUTER" },
  { id: "shose-checkbox", type: "checkbox", label: "SHOES" },
  { id: "bag-checkbox", type: "checkbox", label: "BAG" },
  { id: "accessory-checkbox", type: "checkbox", label: "ACCESSORY" },
];

export default function OutfitGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <div className="">
      <h1 className="">Outfit Suggestion</h1>
      <div className="flex justify-between items-center">

        {/* item card */}
        <div className="">
          <div className="flex justify-center">
            <div className="pr-14">
              <ul className="tracking-tight text-gray-900">
                {clothingCategory.map((category) => (
                  <li
                    key={category}
                    className={`${
                      selectedCategory === category ? "text-primary" : ""
                    } hover:cursor-pointer mr-4 mb-4 text-lg`}
                    onClick={() => {
                      if (selectedCategory !== category) {
                        setSelectedCategory(category);
                      }
                    }}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-5 text-lg font-medium text-gray-strong">
                Select the type of clothes you want to match!
              </h3>
              <ItemsGrid isInput={true} />
              <h3 className="my-5 text-lg font-medium text-gray-strong">
                Which type of clothing would you like to match?
              </h3>
            </div>
          </div>
          {/* Category checkboxes */}
          <div className="flex justify-center">
            <InputGroup
              inputs={categories}
              selected={selectedItem}
              setSelected={setSelectedItem}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5"
            ></InputGroup>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Button color="secondary" additionalclassname="w-80 m-5">
              Get Styled!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
