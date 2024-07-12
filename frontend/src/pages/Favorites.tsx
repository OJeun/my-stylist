import React, { useEffect } from "react";
import { fetchFavouriteItems } from "../stores/features/favouriteItems";
import { useAppDispatch, useAppSelector } from "../stores/store";
import Input from "../components/ui/Input";
import ItemsGrid, { ImageAndID } from "../components/ItemsGrid";

export default function Favorites() {
  const dispatch = useAppDispatch();
  const fetchedFavouriteItems = useAppSelector(
    (state) => state.favouriteItem.favouriteItems
  );

  useEffect(() => {
    dispatch(fetchFavouriteItems());
  }, [dispatch]);

  // const clothingList: {
  //   id: string | number;
  //   selectedItem: string;
  //   generatedItems: ImageAndID[];
  // }[] = fetchedFavouriteItems.map((favouriteItem) => ({
  //   id: favouriteItem.id,
  //   selectedItem: favouriteItem.selectedItem,
  //   generatedItems: favouriteItem.generatedItems.map((item, index) => ({
  //     id: index,
  //     imageSrc: item,
  //     imageAlt: `image ${index}`,
  //   })),
  // }));
  
  

  return (
    <>
      <h1>My Favorites</h1>
      <div className="mt-6 sm:px-6 md:px-8 mx-auto max-w-full sm:max-w-lg md:max-w-1xl lg:max-w-2xl xl:max-w-3xl">
        {fetchedFavouriteItems.map((favouriteItem) => (
          <div key={favouriteItem.id} className="mb-4">
            <Input
              id={String(favouriteItem.id)}
              type="checkbox"
              imageSrc={favouriteItem.selectedItem}
              inputClassName="hidden"
              labelClassName="group-hover:opacity-75 inline-flex items-center mb-4 sm:h-36 md:h-40 lg:h-44 xl:h-48 w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 bg-white rounded-md cursor-pointer overflow-hidden relative"
            />
            <ItemsGrid
              isInput={true}
              clothingImages={favouriteItem.generatedItems}
              inputClassName="hidden"
              labelClassName="group-hover:opacity-75 inline-flex items-center mb-4 sm:h-36 md:h-40 lg:h-44 xl:h-48 w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 bg-white rounded-md cursor-pointer overflow-hidden relative"
              />

          </div>
        ))}
      </div>
    </>
  );
}
