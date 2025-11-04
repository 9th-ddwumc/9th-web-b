import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useAddLp from "../hooks/mutations/useAddLp";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    resetForm();
  };

  const addLpMutation = useAddLp();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [uploadImgUrl, setUploadImgUrl] = useState("");

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTag("");
    setTags([]);
    setUploadImgUrl("");
  };

  const addTag = () => {
    const isTrim = tag.trim();
    if (isTrim && !tags.includes(isTrim)) {
      setTags([...tags, isTrim]);
    }
    setTag("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const rawToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    const token = rawToken?.replace(/^"|"$/g, ""); // 따옴표 제거 (JSON.parse 제거)

    const uploadUrl = token
      ? "http://localhost:8000/v1/uploads"
      : "http://localhost:8000/v1/uploads/public";

    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers,
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadImgUrl(result.data.imageUrl);
      } else {
        console.error(result.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateLp = () => {
    const data = {
      title,
      content,
      thumbnail: uploadImgUrl,
      tags,
      published: true,
    };

    addLpMutation.mutate(data, {
      onSuccess: () => {
        alert("LP 등록이 완료되었습니다.");
        closeModal();
      },
      onError: (error) => {
        alert("LP 등록이 실패했습니다. 다시 시도해 주세요." + error);
      },
    });
  };

  return (
    <>
      <button
        onClick={openModal}
        className="fixed bottom-20 right-6 w-15 h-15 bg-pink-500 flex items-center justify-center px-4 py-2 rounded-full shadow-lg hover:bg-pink-700 z-50 cursor-pointer"
      >
        <span className="text-white font-bold text-2xl">
          <GoPlus />
        </span>
      </button>

      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#282A30] pb-8 pr-8 pl-8 pt-5 rounded-lg shadow-lg  w-full max-w-md z-50"
          >
            <button onClick={closeModal}>
              <span className="absolute top-3 right-4 text-gray-300 text-2xl pr-2 hover:text-white cursor-pointer">
                x
              </span>
            </button>
            <label className="block cursor-pointer mb-3">
              <img
                src={
                  uploadImgUrl ||
                  "https://media.istockphoto.com/id/1408806884/photo/12-inch-vinyl-lp-record-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=RF9dJiOjNmu4pmLSnNWITncbOspZ7BYvTyAQis_OK1U="
                }
                className="w-60 h-60 rounded-full mx-auto object-fill"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full outline-1 outline-gray-500 rounded-sm h-10 pl-3 font-bold mb-3 text-white"
              placeholder="LP Name"
            />
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full outline-1 outline-gray-500 rounded-sm h-10 pl-3 font-bold mb-3 text-white"
              placeholder="LP Content"
            />
            <div className="w-full">
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className=" outline-1 outline-gray-500 rounded-sm h-10 pl-3 font-bold mb-3 w-80 text-white"
                placeholder="LP Tag"
              />
              <button
                onClick={addTag}
                className="bg-pink-500 text-white text-sm px-3 py-2 ml-3 rounded-md hover:bg-pink-700 cursor-pointer"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-[#282A30] text-gray-200 outline-gray-400 outline-1 px-3 py-1.5 rounded-lg flex items-center"
                >
                  <span className="mr-2">{tag}</span>
                  <button
                    onClick={() => removeTag(tag)}
                    type="button"
                    className="text-sm text-gray-300 hover:text-white cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleCreateLp}
              className="bg-pink-500 w-full rounded-sm mt-5 text-white text-lg h-10 hover:bg-pink-700 cursor-pointer"
            >
              Add Lp
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;