import { ChangeEvent } from 'react';

const previewImage = (
  e: ChangeEvent<HTMLInputElement>,
  setImagePreview: (imagePreview: string | null) => void,
  setImage: (image: File | null) => void,
) => {
  if (e.target.files) {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
  }
};

export default previewImage;
