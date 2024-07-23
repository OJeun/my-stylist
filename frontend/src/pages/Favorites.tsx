import React, { useEffect, useState } from "react";
import {
  deleteFavouriteItems,
  fetchFavouriteItems,
} from "../stores/features/favouriteItems";
import { useAppDispatch, useAppSelector } from "../stores/store";
import Input from "../components/ui/Input";
import ItemsGrid from "../components/ItemsGrid";
import Button from "../components/ui/Button";
import { XMarkIcon, XCircleIcon } from "@heroicons/react/24/outline";
import ConfirmationModal from "../components/ui/ConformationModal";

export default function Favorites() {
  const dispatch = useAppDispatch();
  const fetchedFavouriteItems = useAppSelector(
    (state) => state.favouriteItem.favouriteItems
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchFavouriteItems());
  }, [dispatch, fetchedFavouriteItems]);
  
  const openModal = (itemId: string) => {
    setItemIdToDelete(itemId);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setItemIdToDelete(null);
  };
  
  const handleDelete = (itemsId: string) => {
    dispatch(deleteFavouriteItems(itemsId));
  };

  const handleConfirm = async () => {
    if (itemIdToDelete) {
      await handleDelete(itemIdToDelete);
      closeModal();
    }
  };

  return (
    <>
      <h1>My Favorites</h1>
      <div className="flex flex-col items-start">
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleConfirm}
          message="Are you sure you want to delete this item?"
        />
        {fetchedFavouriteItems.map((favouriteItem) => (
          <div
          key={favouriteItem.id}
          className="relative mb-1 pt-6 pl-6 flex items-stretch rounded-lg hover:border-2 hover:border-background hover:bg-gray-200 hover:bg-opacity-50 group"
          >
            <Button
              className="absolute -top-2 -right-8 z-30 opacity-0 group-hover:opacity-100 text-color-primary"
              onClick={() => openModal(favouriteItem.id)}
            >
              <XMarkIcon className="w-7 h-7 text-gray hover:text-background" />
            </Button>

            <div className="flex-shrink-0">
              <Input
                id={String(favouriteItem.id)}
                type="checkbox"
                imageSrc={favouriteItem.selectedItem.imageSrc}
                inputClassName="hidden"
                labelClassName="group-hover:opacity-75 inline-flex items-center border-gray-light border-2 mb-4 sm:h-36 md:h-40 lg:h-44 xl:h-48 w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 bg-white rounded-md cursor-pointer overflow-hidden relative"
              />
            </div>
            <div className="ml-3 flex-grow">
              <ItemsGrid
                isInput={true}
                clothingItems={favouriteItem.generatedItems}
                inputClassName="hidden"
                labelClassName="group-hover:opacity-75 inline-flex items-center border-gray-light border-2 w-full h-full bg-white rounded-lg cursor-pointer overflow-hidden rounded-md relative"
                imageClassName="object-cover max-h-full max-w-full mx-auto"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
