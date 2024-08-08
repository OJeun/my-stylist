import { useState } from 'react';

export const useItemCard = () => {
  const [showItemCard, setShowItemCard] = useState(false);

  const openItemCard = () => {
    setShowItemCard(true);
  };

  const closeItemCard = () => {
    console.log("closeItemCard");
    setShowItemCard(false);
  };

  return {
    showItemCard,
    openItemCard,
    closeItemCard,
  };
};