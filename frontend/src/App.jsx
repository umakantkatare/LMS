import { RouterProvider } from "react-router";
import { router } from "./routes/AppRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { refreshTokenThunk, profileThunk } from "./features/auth/authThunk";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [initializing, setInitializing] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    const initAuth = async () => {
      try {
        if (!user) {
          await dispatch(refreshTokenThunk()).unwrap();

          await dispatch(profileThunk()).unwrap();
        }
      } catch (error) {
        console.log("Session initialization skipped or no active session.");
      } finally {
        setInitializing(false);
      }
    };

    initAuth();
  }, [dispatch, user]);

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
          <p className="text-sm text-zinc-400 tracking-wide">
            Initializing session...
          </p>
        </div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

export default App;
