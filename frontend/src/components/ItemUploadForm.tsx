import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import InputGroup from './ui/InputGroup';
import Button from './ui/Button';
import { InputProps } from './ui/Input';
import { BsArrowRepeat } from 'react-icons/bs';
import { categories } from '../pages/OutfitGenerator';

const seasons: InputProps[] = [
  { id: 'spring-fall-checkbox', type: 'checkbox', label: 'Spring/Fall' },
  { id: 'summer-checkbox', type: 'checkbox', label: 'Summer' },
  { id: 'winter-checkbox', type: 'checkbox', label: 'Winter' },
];

export default function ItemUploadForm({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | string[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string | string[]>("");

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      setImageBase64(base64 as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    setImageBase64(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFormSubmit = async () => {
    if (!selectedCategory || !selectedSeason) {
      alert('Please select both a category and a season.');
      return;
    }

    const data = {
      category: selectedCategory,
      season: selectedSeason,
    };

    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Item uploaded successfully');
    } else {
      console.error('Failed to upload item');
    }

    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Dialog
      className="relative z-10"
      open={isModalOpen}
      onClose={handleCloseModal}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex flex-col items-center space-y-4">
                {/* <!--Close button--> */}
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none absolute top-3 right-3"
                  onClick={handleCloseModal}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div
                  className="relative bg-white border-dashed rounded-lg p-8 border-2 border-gray-light text-center w-[200px] h-[200px] flex items-center justify-center"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div
                    className="btn delete-button text-gray hover:text-black absolute top-2 right-2 hover:cursor-pointer"
                    onClick={handleDeleteImage}
                  >
                    <BsArrowRepeat />
                  </div>
                  {!imageBase64 ? (
                    <p className="text-gray">
                      <strong>Drag & Drop</strong> Your Clothing Photo!
                    </p>
                  ) : (
                    <img className="object-cover max-h-full max-w-full" src={imageBase64} alt="Uploaded" />
                  )}
                </div>
                <div>
                  <div>
                    <h2>Category</h2>
                    <InputGroup
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5"
                      inputs={categories}
                      selected={selectedCategory}
                      setSelected={setSelectedCategory}
                      singleSelection={true}
                    />
                  </div>
                  <div>
                    <h2 className="mt-[15px]">Season</h2>
                    <InputGroup
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5"
                      inputs={seasons}
                      selected={selectedSeason}
                      setSelected={setSelectedSeason}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <Button color="textOnly" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button
                  color="secondary"
                  additionalclassname="w-60"
                  onClick={handleFormSubmit}
                >
                  Add Item
                </Button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
