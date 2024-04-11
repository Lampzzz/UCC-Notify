import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLoading from "@Components/loading/MainLoading";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <MainLoading />
      ) : (
        <>
          <ToastContainer
            autoClose={1000}
            transition={Slide}
            hideProgressBar={true}
          />
          <Outlet />
        </>
      )}
    </>
  );
};

export default App;
