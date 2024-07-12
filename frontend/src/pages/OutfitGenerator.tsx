import ItemsGrid from "../components/ItemsGrid";
import Button from "../components/ui/Button";
import { InputProps } from "../components/ui/Input";
import { useEffect, useState } from "react";
import { ClothingItem, clothingCategory } from "../components/ItemCard";
import InputGroup from "../components/ui/InputGroup";
import { convertImgToInputProps } from "../utils/convertImgToInputPros";
import { fetchAIRecommendation } from "../utils/api/ai";
import { saveFavouriteItems } from "../stores/features/favouriteItems";
import { useAppDispatch } from "../stores/store";

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
  const [selectedCategoryCheckbox, setCategoryCheckbox] = useState<
    string | string[]
  >([""]);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [generatedImageInputProps, setImageInputProps] = useState<InputProps[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSelectItem = (item: ClothingItem) => {
    setSelectedItem(item);
  };

  const addImages = (newBase64s: string[]) => {
    setGeneratedImages(newBase64s);
    const newInputProps = newBase64s.map((base64, index) =>
      convertImgToInputProps(base64, index)
    );
    setImageInputProps(newInputProps);
  };

  const handleAIrequest = async () => {
    setLoading(true);

    const data = {
      selectedCategory,
      selectedCategoryCheckbox,
      selectedItem,
    };

    try {
      const result = await fetchAIRecommendation(data);
      addImages(result.image);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFavourite = async () => {
    if (!selectedItem || generatedImages.length === 0) return;

    setLoading(true);

    const data = {
      id: selectedItem.id,
      selectedItem: selectedItem.imageSrc,
      generatedItems: generatedImages
    };
  
    try {
      dispatch(saveFavouriteItems(data));
    } catch (error) {
      console.error("Error occurred while saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="">Outfit Suggestion</h1>
      <div className="flex items-center">
        <div>
          <div className="flex justify-center">
            {/* left container */}
            <div className="pr-14">
              <ul className="tracking-tight text-gray-strong">
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

            {/* right container */}
            <div>
              <h3 className="mb-5 text-lg font-medium text-gray-strong">
                Select the type of clothes you want to match!
              </h3>
              <ItemsGrid isInput={true} onSelectItem={handleSelectItem} inputClassName={"peer text-primary border-gray-light border-2 focus:ring-primary focus:ring-2"} labelClassName={"group-hover:opacity-75 inline-flex items-center border-gray-light border-2 w-full h-full bg-white rounded-lg cursor-pointer overflow-hidden rounded-md relative"}/>
              <h3 className="my-5 text-lg font-medium text-gray-strong">
                Which type of clothing would you like to match?
              </h3>

              {/* Category checkboxes */}
              <div className="flex justify-center">
                <InputGroup
                  inputs={categories}
                  selected={selectedCategoryCheckbox}
                  setSelected={setCategoryCheckbox}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5"
                ></InputGroup>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Button
                  color="secondary"
                  additionalclassname="w-80 m-9"
                  onClick={handleAIrequest}
                >
                  Get Styled!
                </Button>
                {loading && (
                  <div role="status">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-11 h-11 text-gray-light animate-spin fill-primary"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
              {generatedImages.length > 0 && !loading && (
                <>
                  <h2 className="text-primary">Recommendation for You!</h2>

                  <div className="mt-6 sm:px-6 md:px-8 mx-auto max-w-full sm:max-w-lg md:max-w-1xl lg:max-w-2xl xl:max-w-3xl">
                    <div
                      className={`grid grid-cols-1 ${
                        generatedImageInputProps.length > 3
                          ? "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                          : `sm:grid-cols-${
                              generatedImageInputProps.length - 2
                            } md:grid-cols-${
                              generatedImageInputProps.length - 1
                            } lg:grid-cols-${
                              generatedImageInputProps.length
                            } xl:grid-cols-${generatedImageInputProps.length}`
                      } gap-4`}
                    >
                      {generatedImageInputProps.map((inputProps, index) => (
                        <InputGroup
                          key={index}
                          inputs={[inputProps]}
                          className="flex justify-center"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <Button
                      color="secondary"
                      additionalclassname="w-80 m-9"
                      onClick={handleSaveFavourite}
                    >
                      Save to Favourite
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
