import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../stores/store';
import {
  deleteRecentlyViewedItems,
  fetchRecentlyViewedItems,
} from '../stores/features/recentlyViewedItems';
import Input from '../components/ui/Input';
import ItemsGrid from '../components/ItemsGrid';
import Button from '../components/ui/Button';
import { XMarkIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function RecentlyViewed() {
  const dispatch = useAppDispatch();
  const fetchedOutfit = useAppSelector(
    (state) => state.recentlyViewedItem.recentlyViewedItems
  );
  const userId = localStorage.getItem('uid') || '1';

  useEffect(() => {
    if (userId) {
      dispatch(fetchRecentlyViewedItems(userId));
    }
  }, [dispatch, userId]);
  
  return (
    <>
      <h1 className="text-base text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-6">
        Recently Viewed
      </h1>
      <div className="flex flex-col items-center mb-6">
        {fetchedOutfit.map((recentlyViewedItem) => (
          <div
            key={recentlyViewedItem.recentlyViewedCombinationId}
            className="
          relative
          flex items-stretch
          gap-2 sm:gap-6
          px-3 sm:px-4 md:px-8
          pt-3 pl-3 lg:pt-5 lg:pl-5
          mb-1
          mx-auto
          max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-3xl
          rounded-lg
          hover:border-2 hover:border-background
          hover:bg-gray-200 hover:bg-opacity-50
          group
        "
          >
            <div className="flex flex-shrink-0">
              <Input
                id={String(recentlyViewedItem.recentlyViewedCombinationId)}
                type="checkbox"
                imageSrc={recentlyViewedItem.selectedItem.imgSrc}
                inputClassName="hidden"
                labelClassName="group-hover:opacity-75 inline-flex items-center border-gray-light border-2 mb-4 h-36 h-40 sm:h-36 md:h-40 lg:h-44 xl:h-48 w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 bg-white rounded-md cursor-pointer overflow-hidden relative"
              />
            </div>
            <ItemsGrid
              isInput={true}
              wrapCustomClassName="ml-1 sm:ml-3 flex overflow-x-auto gap-2 sm:gap-6 px-1 md:px-2 mx-auto max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-3xl"
              clothingItems={recentlyViewedItem.generatedItems}
              inputClassName="hidden"
              labelClassName="group-hover:opacity-75 inline-flex items-center border-gray-light border-2 h-36 h-40 sm:h-36 md:h-40 lg:h-44 xl:h-48 w-32 sm:w-36 md:w-40 lg:w-43 xl:w-48 bg-white rounded-lg cursor-pointer overflow-hidden rounded-md relative"
            />
          </div>
        ))}
      </div>
    </>
  );
}
