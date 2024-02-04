import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const App = () => {
  const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (file) => {
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a File!");
    setLoading(true);
    try {
      let res = await axios.post(
        "http://localhost:4000/uploads",
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
      <form onSubmit={handleSubmit} className="h-[80vh] flex flex-col gap-4">
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        <button
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
      </form>
    </div>
  );
};

export default App;
