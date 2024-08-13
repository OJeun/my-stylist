import { ComponentPropsWithoutRef, useState } from "react";
import { ClosetItem } from "../stores/features/closetItems";
import ItemCard from "./ItemCard";
import { useAppDispatch } from "../stores/store";
import { setCategory } from "../stores/features/category";

type ClothingListProps = {
  isInput: boolean;
  clothingItems?: ClosetItem[];
  inputClassName?: string;
  labelClassName?: string;
  imageClassName?: string;
  wrapCustomClassName?: string;
  onItemSelect?: (item: ClosetItem) => void;
  handleReplaceButton?: (item: ClosetItem) => void;
  onSelectItem?: (item: ClosetItem) => void;
  onEdit?: (item: ClosetItem) => void;
} & ComponentPropsWithoutRef<'input'>;

export default function ItemsGrid({
  isInput,
  onSelectItem,
  onEdit,
  clothingItems,
  wrapCustomClassName,
  inputClassName,
  labelClassName,
  imageClassName,
  handleReplaceButton,
}: ClothingListProps) {
  const [clothings, setClothings] = useState<ClosetItem[]>([]);
  const [selectedClothing, setSelectedClothing] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const handleSelectClothing = (index: number, item: ClosetItem) => {
    setSelectedClothing(index);
    dispatch(setCategory(item.typeId))
    if (onSelectItem) onSelectItem(item);
  };

  const clothingList = clothingItems
    ? clothingItems.map((item, index) => ({
        ...item,
        imageAlt: `index ${item.clothId}`,
      }))
    : clothings;

  const defaultWrapClassName =
    "flex items-center justify-center overflow-x-auto gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 mx-auto max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-2xl xl:max-w-2xl";

  const wrapClassName = wrapCustomClassName ? wrapCustomClassName : defaultWrapClassName

  return (
    <div className={wrapClassName}>
      {clothingList.map((items, index) => (
        <ItemCard
          key={index}
          inputClassName={inputClassName}
          labelClassName={labelClassName}
          clothing={items}
          index={index}
          isSelected={selectedClothing === index}
          onSelect={() => {
            handleSelectClothing(index, items);
            if (onSelectItem) onSelectItem(items);
          }}
          onEdit={onEdit}
          isInput={isInput}
          imageClassName={imageClassName}
          handleReplaceButton={handleReplaceButton}
        />
      ))}
    </div>
  );
}
