import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAccount } from "@/store/slices/auth/authSlice";
import HomeLayout from "@/layout/HomeLayout";

const LogInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    const result = await dispatch(loginAccount(data));
    console.log("login data:", result);
    console.log("login data2:", result?.payload);
    if (result?.payload?.success) {
      navigate("/");
    }
    reset();
  };

  return (
    <HomeLayout>
      {" "}
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-gray-900 to-black px-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl">
          <CardContent className="p-8 space-y-6">
            {/* Title */}
            <div className="text-center space-y-1">
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
              <p className="text-sm text-gray-300">Login to continue 🚀</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                Login
              </Button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-400">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-white underline cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </HomeLayout>
  );
};

export default LogInPage;
