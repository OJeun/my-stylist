import { useEffect, useState } from 'react';
import ItemsGrid from '../components/ItemsGrid';
import Button from '../components/ui/Button';
import ItemUploadForm from '../components/ItemUploadForm';
import Dropdown from '../components/ui/Dropdown';
import { useAppDispatch, useAppSelector } from '../stores/store';
import {
  ClosetItem,
  deleteClosetItems,
  fetchClosetItems,
} from '../stores/features/closetItems';
import { setCategory } from '../stores/features/category';
import { getTypeId } from '../utils/api/getId';

export default function MyCloset() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = ['Top', 'Bottom', 'Outer', 'Shoes', 'Bag', 'Accessories'];
  const dispatch = useAppDispatch();

  const fetchedClosetItems = useAppSelector(
    (state) => state.closetItem.closetItems
  );

  const selectedCategory = useAppSelector((state) => state.category.category);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchClosetItems(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  const handleItemAdd = async () => {
    setIsModalOpen(true);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  function handleDeleteItem(itemToBeDeleted: ClosetItem): void {
    const intTypeId = getTypeId(selectedCategory)
    dispatch(
      deleteClosetItems({
        clothId: itemToBeDeleted.clothId as number,
        typeId: intTypeId as number,
        userId: localStorage.getItem('uid') as string,
      })
    );
  }

  // const handleCategorySelect = (category: string) => {
  //   setSelectedCategory(category)
  //   dispatch(fetchClosetItems(category.toLowerCase()))
  //   dispatch(setCategory(category.toLowerCase()))

  // }

  return (
    <div>
      <h1>My Closet</h1>
      <div className="flex justify-between">
        <Dropdown
          title="Category"
          categories={categories}
        />
        <Button
          color="secondary"
          onClick={handleItemAdd}
          additionalclassname={'mx-2'}
        >
          Add Your Item
        </Button>
      </div>
      <div className="flex justify-center">
        <ItemsGrid
          isInput={false}
          clothingItems={fetchedClosetItems}
          onDelete={handleDeleteItem}
          wrapCustomClassName="flex items-center mr-2 ml-2 sm:ml-3 flex overflow-x-auto gap-2 sm:gap-6 px-1 md:px-2 mx-auto max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-3xl"
          labelClassName={
            'group-hover:opacity-75 inline-flex items-center border-gray-light border-2 w-full h-full bg-white rounded-lg cursor-pointer overflow-hidden rounded-md relative'
          }
          imageClassName="object-cover h-full w-full mx-auto"
        />
      </div>

      {isModalOpen && (
        <ItemUploadForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}
