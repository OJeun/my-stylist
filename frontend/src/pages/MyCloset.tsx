import { useState } from 'react';
import ItemsGrid from '../components/ItemsGrid';
import Button from '../components/ui/Button';
import ItemUploadForm from '../components/ItemUploadForm';
import Dropdown from '../components/ui/Dropdown';

export default function MyCloset() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = ['Top', 'Bottom', 'Outer', 'Shoes', 'Bag', 'Accessory'];

  const handleItemAdd = async () => {
    setIsModalOpen(true);
    try {
      // TODO
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
          additionalclassname={'mx-2'}
        >
          Add Your Item
        </Button>
      </div>
      <ItemsGrid isInput={false} />
      {isModalOpen && (
        <ItemUploadForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}
