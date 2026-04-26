import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { loginThunk } from "@/features/auth/authThunk";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Login Submit
  const onSubmit = async (data) => {
    try {
      const result = await dispatch(loginThunk(data));

      if (result?.payload?.success) {
        reset();
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Forgot Password Submit
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <header className="w-full flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sheriyans <span className="font-light">Coding School</span>
        </h1>

        <nav className="hidden md:flex border border-zinc-800 rounded-xl px-6 py-3 gap-8 text-sm text-zinc-300">
          <Link to="/">Home</Link>
          <Link to="/">Courses</Link>
          <Link to="/">Bootcamp</Link>
          <Link to="/">Request Callback</Link>
        </nav>

        <Link
          to="/register"
          className="text-sm text-zinc-300 hover:text-white"
        >
          Sign Up
        </Link>
      </header>

      {/* Main */}
      <div className="flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-xl">
          {/* Title */}
          <div className="mb-10">
            <h2 className="text-6xl font-bold leading-none">Sign In</h2>

            <p className="mt-2 text-zinc-400 text-xl">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-orange-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <Label className="text-lg mb-2 block">Email</Label>

              <Input
                placeholder="Enter your email here"
                {...register("email", {
                  required: "Email is required",
                })}
                className="h-14 bg-transparent border-zinc-800 text-white"
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>
            </div>

            {/* Password */}
            <div>
              <Label className="text-lg mb-2 block">Password</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password required",
                  })}
                  className="h-14 bg-transparent border-zinc-800 text-white pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-orange-500 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-14 text-lg bg-orange-600 hover:bg-orange-700 rounded-md"
            >
              Login Now
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px bg-zinc-800 flex-1"></div>
              <span className="text-zinc-500">Or</span>
              <div className="h-px bg-zinc-800 flex-1"></div>
            </div>

            {/* Google */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-14 border-zinc-800 bg-zinc-950 hover:bg-zinc-900"
            >
              Continue with Google
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}