import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { forgotPasswordThunk } from "@/features/auth/authThunk";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Reset Email:", data);
    // await dispatch(forgotPasswordThunk(data))
    const res = await dispatch(forgotPasswordThunk(data));
    console.log("forgot pssword:", res);
    if (res.payload.success) {
      reset();
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Enter your email to receive a reset link
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1 h-6 w-5 text-zinc-500" />

              <Input
                type="email"
                placeholder="Enter your email"
                className="pl-10 bg-zinc-950 border-zinc-700 text-white"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black hover:bg-zinc-200 font-semibold"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-400 mt-6">
          Remember password?{" "}
          <Link to="/login" className="text-white font-medium hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
