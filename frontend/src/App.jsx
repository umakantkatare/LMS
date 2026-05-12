import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoute";
import { useEffect } from "react";
import { refreshTokenThunk } from "./features/auth/authThunk";

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(refreshTokenThunk());
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
