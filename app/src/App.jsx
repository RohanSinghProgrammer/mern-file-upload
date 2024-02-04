import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const App = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || name.length < 1 || email.length < 1) {
      return toast.error("Please Fill all fields!");
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    try {
      const res = await axios.post("http://localhost:4000/uploads", formData);
      if (res.ok) {
        toast.success("Image Uploaded Successfully!");
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
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
        transition:Bounce
      />
      <h1 className="text-2xl font-bold">MERN File Uploader ❤️🐳</h1>
      <form onSubmit={handleSubmit} className="h-[80vh] flex flex-col gap-4">
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          className="file-input file-input-bordered file-input-accent w-full max-w-xs"
        />
        <button className="btn btn-accent" type="submit">
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
