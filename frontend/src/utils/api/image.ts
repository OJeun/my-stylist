import { ClosetItem } from "../../stores/features/closetItems";

export const setDefaultImg = (cloth: ClosetItem) => {
    console.log("cloth", cloth.typeId.toString());
    if (!cloth.imgSrc) {
      switch (cloth.typeId.toString()) {
        case "1":
          return "/assets/top.png";
        case "2":
          return "/assets/bottom.png";
        case "3":
          return"./assets/outer.png";
        case "4":
          return"./assets/shoes.png";
        case "5":
          return "./assets/bag.png";
        case "6":
          return "./assets/accessories.png";
        default:
          return "./assets/default.png";
      }
    } else {
      return cloth.imgSrc;
  }};


export const isDefaultImg = (cloth: ClosetItem) => {
  if (!cloth.imgSrc) {
    return true;
  } else {
    return false;
  }
}