import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { loginThunk } from "@/features/auth/authThunk";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(loginThunk(data)).unwrap();

      if (result?.success) {
        console.log("login success msg:", result.success);
        toast.success("Welcome back!");
        reset();
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error || "Login failed. Please check your credentials.",
      );
      console.log("login err msg:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      <header className="w-full flex justify-start items-center px-6 md:px-10 py-6">
       <Link to="/" className="text-white leading-none">
          <h1 className="text-xl md:text-3xl font-semibold tracking-tight">
            Learning
          </h1>
          <p className="text-sm md:text-xl font-light text-white/90">
            Coding School
          </p>
        </Link>
      </header>

      <main className="flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-xl">
          <div className="mb-10">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">
              Sign In
            </h2>
            <p className="mt-4 text-zinc-400 text-lg">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-orange-500 hover:text-orange-400 font-medium transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            autoComplete="off"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="off"
                placeholder="name@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                className="h-14 bg-zinc-900/50 border-zinc-800 focus:ring-orange-500"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  size="sm"
                  className="text-sm text-orange-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="h-14 bg-zinc-900/50 border-zinc-800 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 text-lg bg-orange-600 hover:bg-orange-700 text-white transition-all active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Login Now"
              )}
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-zinc-500">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              className="w-full h-14 border-zinc-800 bg-transparent hover:bg-zinc-900"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
