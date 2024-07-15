import { useEffect, useState } from "react";
import ItemsGrid from "../components/ItemsGrid";
import Button from "../components/ui/Button";
import ItemUploadForm from "../components/ItemUploadForm";
import Dropdown from "../components/ui/Dropdown";
import { useAppDispatch, useAppSelector } from "../stores/store";
import {
  addClosetItems,
  fetchClosetItems,
} from "../stores/features/closetItems";

export default function MyCloset() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = ["Top", "Bottom", "Outer", "Shoes", "Bag", "Accessory"];
  const dispatch = useAppDispatch();

  const fetchedClosetItems = useAppSelector(
    (state) => state.closetItem.closetItems
  );
  const fetchedImages = fetchedClosetItems.map(
    (item, index) => item.imageString
  );

  useEffect(() => {
    dispatch(fetchClosetItems("top"));
  }, [dispatch]);

  const handleItemAdd = async () => {
    setIsModalOpen(true);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>My Closet</h1>
      <div className="flex justify-between">
        <Dropdown title="Category" categories={categories} />
        <Button
          color="secondary"
          onClick={handleItemAdd}
          additionalclassname={"mx-2"}
        >
          Add Your Item
        </Button>
      </div>
      <ItemsGrid
        isInput={false}
        clothingImages={fetchedImages}
        labelClassName="group-hover:opacity-75 inline-flex items-center border-gray-light border-2 w-full h-full bg-white rounded-lg cursor-pointer overflow-hidden rounded-md relative"
        imageClassName="object-cover max-h-full max-w-full mx-auto"
      />
      {isModalOpen && (
        <ItemUploadForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}
