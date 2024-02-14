import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadFile from "./components/UploadFile";
import axios from "axios";

const App = () => {
  const [modal, setModal] = useState(false);
  // COPY LINK
  const copyImgLink = (link) => {
    if (!navigator.clipboard) {
      toast.error("Your browser is not compatible to use this feature ☹️");
      return;
    }

    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Image URL copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy Image URL:", err);
      });
  };
  // GET IMAGES
  const [images, setImages] = useState(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/uploads`)
      .then(({ data }) => setImages(data));
  }, [modal]);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        modal ? "overflow-y-hidden" : ""
      }`}
    >
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
      <nav className="px-4 flex items-center justify-between h-16 sticky top-0 backdrop-blur-md">
        <h5 className="text-2xl font-semibold text-cyan-700">Gallery</h5>
        <button
          onClick={() => setModal(true)}
          className="bg-cyan-600 hover:bg-cyan-500 rounded-md px-6 py-2 text-white"
        >
          Add Image
        </button>
      </nav>
      {/* MODAL */}
      {modal && (
        <div className="absolute h-screen w-full bg-[rgba(0,0,0,0.4)] grid place-items-center">
          <UploadFile setModal={setModal} />
        </div>
      )}
      {/* ---------------------------------- BODY ---------------------------------- */}
      <main className="flex-1 grid md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        {images &&
          images.map((item) => (
            <div className="grid place-items-center" key={item._id}>
              <img
                onClick={() => copyImgLink(item.imgUrl)}
                src={item.imgUrl}
                alt="Error ☹️"
                className="object-contain"
              />
            </div>
          ))}
      </main>
      {/* ---------------------------------- FOOTER ---------------------------------- */}
      <footer className="flex justify-between h-16 items-center px-4 bg-cyan-600 text-white">
        <p>Made With ❤️ By Rohan Singh</p>
        <p>&copy; All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default App;
