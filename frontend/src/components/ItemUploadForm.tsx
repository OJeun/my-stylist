import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import InputGroup from './ui/InputGroup';
import Button from './ui/Button';
import { InputProps } from './ui/Input';

export default function ItemUploadForm() {
  const [open, setOpen] = useState(true);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const categories: InputProps[] = [
    { id: 'checkbox', type: 'checkbox', label: 'Top' },
    { id: 'bottom-checkbox', type: 'checkbox', label: 'Bottom' },
    { id: 'outer-checkbox', type: 'checkbox', label: 'Outer' },
    { id: 'shose-checkbox', type: 'checkbox', label: 'Shoes' },
    { id: 'bag-checkbox', type: 'checkbox', label: 'Bag' },
    { id: 'accessory-checkbox', type: 'checkbox', label: 'Accessory' },
  ];

  const seasons: InputProps[] = [
    { id: 'spring-fall-checkbox', type: 'checkbox', label: 'Spring/Fall' },
    { id: 'summer-checkbox', type: 'checkbox', label: 'Summer' },
    { id: 'winter-checkbox', type: 'checkbox', label: 'Winter' },
  ];

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
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
                  className="border-dashed border-2 border-primary p-8 text-center w-[200px] h-[200px] flex items-center"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  style={{ border: '2px dashed #ccc' }}
                >
                  <p>Drag & Drop Your Clothing Photo!</p>
                </div>
                <div>
                  <h5 className="text-2xl font-medium">Styles</h5>
                  <InputGroup inputs={categories} />
                </div>
                <div>
                  <h5 className="text-2xl font-medium">Seasons</h5>
                  <InputGroup inputs={seasons} />
                </div>
              </div>

              <div className="mt-4 flex justify-center space-x-4">
                <Button color="textOnly" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button color="secondary" additionalclassname="w-60">
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
