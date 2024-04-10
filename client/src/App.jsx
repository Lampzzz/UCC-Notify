import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLoading from "@Components/loading/MainLoading";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return <>{loading ? <MainLoading /> : <Outlet />}</>;
};

export default App;
