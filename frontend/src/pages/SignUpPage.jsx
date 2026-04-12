import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { createAccount } from "@/store/slices/auth/authSlice";
import HomeLayout from "@/layout/HomeLayout";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("avatar", data.avatar[0]);
    const result = await dispatch(createAccount(formData));

    console.log("result", result);
    if (result?.payload?.success) {
      navigate("/");
    }
    reset();
    setPreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("avatar file", file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      console.log("preview url", url);
    }
  };

  return (
    <HomeLayout>
      {" "}
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-gray-900 to-black px-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl">
          <CardContent className="p-8 space-y-6">
            {/* Title */}
            <div className="text-center space-y-1">
              <h2 className="text-3xl font-bold text-white">Create Account</h2>
              <p className="text-sm text-gray-300">
                Join us and start your journey 🚀
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Profile Upload */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-white/30"
                    />
                  ) : (
                    <BsPersonCircle className="w-24 h-24 rounded-full m-auto bg-gray-500 text-white" />
                  )}
                  <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer">
                    <Upload size={16} />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      {...register("avatar", {
                        onChange: (e) => handleImageChange(e),
                      })}
                    />
                  </label>
                </div>
                {errors.avatar && (
                  <p className="text-red-400 text-xs">
                    {errors.avatar.message}
                  </p>
                )}
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <Label className="text-gray-200">Full Name</Label>
                <Input
                  className="bg-white/20 text-white placeholder:text-gray-400 border-none focus-visible:ring-1 focus-visible:ring-white"
                  placeholder="John Doe"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: { value: 3, message: "Min 3 chars" },
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label className="text-gray-200">Email</Label>
                <Input
                  type="email"
                  className="bg-white/20 text-white placeholder:text-gray-400 border-none focus-visible:ring-1 focus-visible:ring-white"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1 relative">
                <Label className="text-gray-200">Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  className="bg-white/20 text-white placeholder:text-gray-400 border-none focus-visible:ring-1 focus-visible:ring-white pr-10"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 chars" },
                  })}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-6 cursor-pointer text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
                {errors.password && (
                  <p className="text-red-400 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200 font-semibold active:scale-95"
              >
                Sign Up
              </Button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-white underline cursor-pointer">
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </HomeLayout>
  );
}
