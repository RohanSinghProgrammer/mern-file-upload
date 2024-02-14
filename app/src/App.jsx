import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import UploadFile from "./components/UploadFile";

const App = () => {
  const [modal, setModal] = useState(false);
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
    <div className="flex flex-col h-screen">
      {/* ------------------- TOAST CONTAINER ------------------- */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* ---------------------------------- HEADER ---------------------------------- */}
      <nav className="px-4 flex items-center justify-between h-16 sticky top-0 backdrop-blur-lg">
        <h5 className="text-xl font-semibold text-cyan-700">Gallery</h5>
        <button
          onClick={() => setModal(true)}
          className="bg-cyan-600 hover:bg-cyan-500 rounded-md px-6 py-2 text-white"
        >
          Add Image
        </button>
      </nav>
      {/* MODAL */}
      {modal && (
        <div className="absolute h-screen w-screen bg-[rgba(0,0,0,0.4)] grid place-items-center">
          <UploadFile
            setModal={setModal}
            fileTypes={fileTypes}
            handleChange={handleChange}
            handleTypeError={handleTypeError}
            handleSubmit={handleSubmit}
            file={file}
            setFile={setFile}
          />
        </div>
      )}
      {/* ---------------------------------- BODY ---------------------------------- */}
      <main className="flex-1"></main>
      {/* ---------------------------------- FOOTER ---------------------------------- */}
      <footer className="flex justify-between h-16 items-center px-4 bg-cyan-600 text-white w-screen">
        <p>Made With ❤️ By Rohan Singh</p>
        <p>&copy; All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default App;
