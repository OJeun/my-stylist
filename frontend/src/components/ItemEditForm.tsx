import React, { useState, useEffect, SetStateAction } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import InputGroup from './ui/InputGroup';
import Button from './ui/Button';
import { InputProps } from './ui/Input';
import {
  ClosetItem,
  deleteClosetItems,
  updateClosetItems,
} from '../stores/features/closetItems';
import { useAppDispatch } from '../stores/store';
import Input from './ui/Input';
import {
  convertTypeIdToCategory,
  getSeasonId,
  getTypeId,
} from '../utils/api/getId';
import ConfirmationModal from './ui/ConformationModal';

const seasons: InputProps[] = [
  { id: 'spring-fall', type: 'checkbox', label: 'Spring/Fall' },
  { id: 'summer', type: 'checkbox', label: 'Summer' },
  { id: 'winter', type: 'checkbox', label: 'Winter' },
];

type ItemEditFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  selectedClothing: ClosetItem;
};

export default function ItemEditForm({
  isModalOpen,
  setIsModalOpen,
  selectedClothing,
}: ItemEditFormProps) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSeason, setSelectedSeason] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedClothing && selectedClothing.clothId !== undefined) {
      setImageBase64(selectedClothing.imgSrc);
      setSelectedCategory(
        convertTypeIdToCategory(
          Number(selectedClothing.typeId)
        )?.toUpperCase() || ''
      );
      setDescription(selectedClothing.description);
    }
  }, [selectedClothing, dispatch]);

  const handleSeasonChange = (newSeason: SetStateAction<string | string[]>) => {
    if (typeof newSeason === 'function') {
      setSelectedSeason((prev) => {
        const result = (
          newSeason as (prev: string | string[]) => string | string[]
        )(prev);
        return Array.isArray(result) ? result : [result];
      });
    } else if (Array.isArray(newSeason)) {
      setSelectedSeason(newSeason);
    } else {
      setSelectedSeason([newSeason]);
    }
  };

  const handleFormSubmit = async () => {
    if (!selectedSeason) {
      alert('Please select both a category and a season.');
      return;
    }
    console.log('Selected Season before submit:', selectedSeason);

    const data: any = {
      clothId: selectedClothing.clothId as number,
      userId: localStorage.getItem('uid') as string,
      imgSrc: imageBase64 as string,
      season: getSeasonId(selectedSeason),
      typeId: selectedCategory as string,
      description: description as string,
    };
    console.log('Season IDs:', data.season);
    console.log('data', data);
    dispatch(updateClosetItems(data));
    setIsModalOpen(false);
  };

  function handleDeleteItem(): void {
    const intTypeId = getTypeId(selectedCategory);
    dispatch(
      deleteClosetItems({
        typeId: intTypeId as number,
        userId: localStorage.getItem('uid') as string,
        clothId: selectedClothing.clothId as number,
      })
    );
    setIsModalOpen(false);
  }

  const handleConfirm = async () => {
    if (selectedClothing) {
      await handleDeleteItem();
      closeConfirmationModal();
    }
  };

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
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

                <div className="relative bg-white text-center w-[150px] h-[150px] md:w-[200px] md:h-[200px] flex items-center justify-center">
                  <img
                    className="object-cover max-h-full max-w-full"
                    src={imageBase64 || ''}
                    alt="Uploaded"
                  />
                </div>
                <div>
                  <div>
                    <h2 className="mt-[15px]">Season</h2>

                    <InputGroup
                      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5"
                      inputs={seasons}
                      selected={selectedSeason}
                      setSelected={handleSeasonChange}
                      singleSelection={false}
                    />
                  </div>
                  <div>
                    <h2 className="mt-[15px]">Description</h2>
                    <p className="mb-2 text-sm text-red">
                      * This will be used for generating AI suggestion. Please
                      describe as detailed as possible.
                    </p>
                    <Input
                      type="text"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      inputClassName="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <Button
                  color="secondary"
                  additionalclassname="w-30 sm:w-60"
                  onClick={handleFormSubmit}
                >
                  SAVE CHANGE
                </Button>
                <Button color="primary" onClick={openConfirmationModal}>
                  DELETE ITEM
                </Button>
              </div>
            </div>

            <ConfirmationModal
              isOpen={isConfirmationModalOpen}
              onClose={closeConfirmationModal}
              onConfirm={handleConfirm}
              message="Are you sure you want to delete this item?"
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
