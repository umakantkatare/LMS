import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoute";
import { useDispatch } from "react-redux";
import { profileThunk } from "./features/auth/authThunk";

const App = () => {
  // const dispatch = useDispatch();
  // useEffect(async () => {
  //   await dispatch(profileThunk());
  // }, []);

  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
