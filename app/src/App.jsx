import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const App = () => {
  const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
      } else {
        toast.warn("Something Went Wrong! Contact Developer.");
        console.log(res);
      }
    } catch (error) {
      return toast.error(error.message);
    } finally {
      setLoading(false);
      setFile(null);
    }
  };
  return (
    <div className="grid place-items-center h-screen">
      {/* ------------------- TOAST CONTAINER ------------------- */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1 className="text-2xl font-bold">MERN File Uploader ❤️🐳</h1>
      <div className="h-[80vh] flex flex-col gap-4">
        {/* ------------------- IMAGE UPLOAD CONTAINER ------------------- */}
        <FileUploader
          onTypeError={handleTypeError}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        >
          <div className="w-80 p-4  border border-gray-500 border-dashed grid place-items-center rounded-lg">
            <img src="upload-placeholder.jpeg" />
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
              src="delete-icon.jpeg"
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
          {loading ? (
            <>
              <span className="loading loading-spinner"></span>
              <p>Loading</p>
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};

export default App;
