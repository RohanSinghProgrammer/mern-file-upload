/* eslint-disable react/prop-types */
import { FileUploader } from "react-drag-drop-files";
import UploadPlaceholderImg from "../assets/upload-placeholder.jpeg";
import RemoveIcon from "../assets/remove.svg";
import CloseIcon from "../assets/close.svg";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const UploadFile = ({ setModal }) => {
  const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];
  const [file, setFile] = useState(null);

  // SET IMAGE TO STATE
  const handleChange = (file) => {
    setFile(file);
  };

  // CHECK IMAGE TYPE
  const handleTypeError = (err) => {
    toast.error(err);
  };

  // HANDLE IMAGE UPLOAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a File!");
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API_URL}/uploads`,
        {
          image: file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 201) {
        toast.success("Image Uploaded Successfully!");
        setModal(false);
      } else {
        toast.warn("Something Went Wrong! Contact Developer.");
        console.log(res);
      }
    } catch (error) {
      return toast.error(error.message);
    } finally {
      setFile(null);
    }
  };
  return (
    <div className="flex flex-col gap-4 bg-white p-8 rounded-xl relative">
      <button
        onClick={() => setModal(false)}
        className="absolute top-3 right-3"
      >
        <img className="h-4" src={CloseIcon} alt="x" />
      </button>
      {/* ------------------- IMAGE UPLOAD CONTAINER ------------------- */}
      <FileUploader
        onTypeError={handleTypeError}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      >
        <div className="w-80 p-4  border border-gray-500 border-dashed grid place-items-center rounded-lg">
          <img src={UploadPlaceholderImg} />
          <div>
            <p className="text-lg text-center mb-2 font-semibold">
              Drag & Drop or Click here to upload Image
            </p>
            <p className="text-sm text-center text-gray-700">
              Supported only JPG, JPEG, PNG & GIF
            </p>
          </div>
        </div>
      </FileUploader>
      {/* ------------------- PREVIEW IMAGE CONTAINER ------------------- */}
      {file && (
        <div className="flex items-center space-x-4 relative">
          <img
            onClick={() => setFile(null)}
            className="absolute top-0 right-0 p-2 text-xs rounded-lg h-8 cursor-pointer"
            src={RemoveIcon}
            alt="-"
          />
          <img src={URL.createObjectURL(file)} className="h-16" />
          <p>{file.name}</p>
        </div>
      )}
      <button
        onClick={handleSubmit}
        className="px-12 py-4 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600 active:scale-90"
        type="submit"
      >
        Submit
      </button>
    </div>
  );
};

export default UploadFile;
