import React, { useEffect } from 'react';
import { fetchFavouriteItems } from "../stores/features/favouriteItems";
import { useAppDispatch, useAppSelector } from "../stores/store";

export default function Favorites() {
  const dispatch = useAppDispatch();
  const fetchedFavouriteItems = useAppSelector(state=> 
    state.favouriteItem.favouriteItems
  );
  console.log(fetchedFavouriteItems)

  useEffect(() => {
    dispatch(fetchFavouriteItems()); 
  }, [dispatch]);

  return (
    <>
      <h1>My Favorites</h1>

      {fetchedFavouriteItems.map((favouriteItem) => (
        <img src={favouriteItem.selectedItem} alt='alt' />
      )
    )}

    </>
  );
}
