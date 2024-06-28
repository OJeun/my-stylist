export type ClothingItem = {
  id: number;
  name: string;
  imageSrc: string;
  imageAlt: string;
};

type ClothingCardProps = {
  clothing: ClothingItem;
  index: number;
  selectedClothing: number | null;
  setSelectedClothing: (index: number) => void;
};

export default function ItemCard({
  clothing,
  index,
  selectedClothing,
  setSelectedClothing,
}: ClothingCardProps) {
  return (
    <div key={clothing.id} className="group relative aspect-w-1 aspect-h-1">
      <div className="mb-4 h-[200px] w-[200px] overflow-hidden rounded-md group-hover:opacity-75">
        <input
          id={`clothing-${index}`}
          type="radio"
          className="hidden peer"
          name="clothing"
          value={clothing.id}
          onChange={() => setSelectedClothing(index)}
          required
        />
        <label
          htmlFor={`clothing-${index}`}
          className={`inline-flex items-center border-gray-light border-2 peer-checked:border-primary justify-between w-full h-full bg-white rounded-lg cursor-pointer hover:bg-gray-light dark:bg-gray-strong dark:hover:bg-gray overflow-hidden rounded-md bg-gray group-hover:opacity-75 relative
`}
        >
          <img
            src={clothing.imageSrc}
            alt={clothing.imageAlt}
            className="w-full h-full object-cover"
          />
        </label>
      </div>
    </div>
  );
}
