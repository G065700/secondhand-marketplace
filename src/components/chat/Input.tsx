import { IoImageOutline } from 'react-icons/io5';
import { RiSendPlaneLine } from 'react-icons/ri';
import { FormEvent, useRef, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { CgClose } from 'react-icons/cg';
import previewImage from '@/helpers/previewImage';
import uploadImage from '@/helpers/uploadImage';

interface InputProps {
  receiverId: string;
  currentUserId: string;
}

const sendRequest = (
  url: string,
  {
    arg,
  }: {
    arg: { text: string; image: string; receiverId: string; senderId: string };
  },
) => {
  return fetch(url, { method: 'POST', body: JSON.stringify(arg) }).then((res) =>
    res.json(),
  );
};

const Input = ({ receiverId, currentUserId }: InputProps) => {
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const imageRef = useRef<HTMLInputElement>(null);
  const chooseImage = () => {
    imageRef.current?.click();
  };

  const { trigger } = useSWRMutation('/api/chat', sendRequest);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imgUrl = image ? await uploadImage(image as File) : null;

    if (message || imgUrl) {
      try {
        trigger({
          text: message,
          image: imgUrl,
          receiverId,
          senderId: currentUserId,
        });
      } catch (error) {
        console.error(error);
      }
    }

    setMessage('');
    setImage(null);
    setImagePreview(null);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        relative
        w-full
        flex justify-between items-center gap-4
        p-2 pl-4
        border-[1px] border-gray-300
        rounded-md
        shadow-sm
      "
    >
      {imagePreview && (
        <div className="absolute right-0 bottom-[4.2rem] w-full max-w-[300px] overflow-hidden rounded-md shadow-md">
          <img src={imagePreview} alt="" />
          <span
            onClick={removeImage}
            className="
              absolute top-[0.4rem] right-[0.4rem]
              flex justify-center items-center
              p-2
              text-xl text-white
              bg-gray-900
              cursor-pointer
              rounded-full
              opacity-60 hover:opacity-100
            "
          >
            <CgClose />
          </span>
        </div>
      )}

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 작성해 주세요."
        className="w-full text-base outline-none"
      />

      <input
        type="file"
        ref={imageRef}
        accept="image/*"
        multiple={false}
        onChange={(e) => previewImage(e, setImagePreview, setImage)}
        className="hidden"
      />

      <div
        onClick={chooseImage}
        className="text-2xl text-gray-200 cursor-pointer"
      >
        <IoImageOutline />
      </div>

      <button
        type="submit"
        className="
          flex justify-center items-center
          p-2
          text-gray-900
          bg-teal-500 hover:bg-teal-600
          rounded-lg
          cursor-pointer
          disabled:opacity-60
        "
      >
        <RiSendPlaneLine className="text-white" />
      </button>
    </form>
  );
};

export default Input;
