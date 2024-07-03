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

export default function ItemUploadForm() {
  const [open, setOpen] = useState(true);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);


  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      setImageBase64(base64 as string);

      reader.readAsDataURL(file);
    };
  };

  const handleDeleteImage = () => {
    setImageBase64(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setOpen(false);
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

    setOpen(false);
  };

  return (
    <Dialog
      className="relative z-10"
      open={open}
      onClose={() => setOpen(false)}
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
                  onClick={() => setOpen(false)}
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
                  className="relative border-dashed border-2 border-primary p-8 text-center w-[200px] h-[200px] flex items-center justify-center"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  style={{ border: '2px dashed #ccc' }}
                >
                  <div
                    className="btn delete-button absolute top-2 right-2"
                    onClick={handleDeleteImage}
                  >
                    <BsArrowRepeat />
                  </div>
                  {!imageBase64 ? (
                    <p>Drag & Drop Your Clothing Photo!</p>
                  ) : (
                    <img
                      src={imageBase64}
                      alt="Uploaded"
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  )}
                </div>
                <div>
                  <h1>Category</h1>
                  <InputGroup
                    inputs={categories}
                    selected={selectedCategory}
                    setSelected={setSelectedCategory}
                  />
                </div>
                <div>
                  <h1>Season</h1>
                  <InputGroup
                    inputs={seasons}
                    selected={selectedSeason}
                    setSelected={setSelectedSeason}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <Button color="textOnly" onClick={() => setOpen(false)}>
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
