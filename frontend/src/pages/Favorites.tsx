import React, { useEffect } from "react";
import { fetchFavouriteItems } from "../stores/features/favouriteItems";
import { useAppDispatch, useAppSelector } from "../stores/store";
import Input from "../components/ui/Input";

export default function Favorites() {
  const dispatch = useAppDispatch();
  const fetchedFavouriteItems = useAppSelector(
    (state) => state.favouriteItem.favouriteItems
  );

  useEffect(() => {
    dispatch(fetchFavouriteItems());
  }, [dispatch]);

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
              labelClassName="group-hover:opacity-75 inline-flex items-center mb-4 h-[200px] w-[200px] bg-white rounded-md cursor-pointer overflow-hidden relative"
            />
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"></div>
          </div>
        ))}
      </div>
    </>
  );
}
