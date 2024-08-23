import { ClosetItem } from "../../stores/features/closetItems";

export const setDefaultImg = (cloth: ClosetItem) => {
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

export async function uploadImageToS3Bucket(imageFile: File): Promise<string | null> {
  const formData = new FormData();
  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await fetch('/api/upload-image', {
    method: 'POST',
    body: formData,
  });

  const responseBody = await response.json();
  return responseBody.imgSrc;
}
