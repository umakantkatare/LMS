import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { registerThunk } from "@/features/auth/authThunk";
import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log("data", data);
    const res = await dispatch(registerThunk(data));
    if (res.payload.success) {
      reset();
      navigate("/login");
    }
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

        <Link to="/login" className="text-sm text-zinc-300 hover:text-white">
          Sign In
        </Link>
      </header>

      {/* Main */}
      <div className="flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-xl">
          {/* Title */}
          <div className="mb-10">
            <h2 className="text-6xl font-bold leading-none">Sign Up</h2>

            <p className="mt-2 text-zinc-400 text-xl">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Row */}
            <div>
              <div>
                <Label className="text-lg mb-2 block">Name</Label>
                <Input
                  placeholder="Enter your Name here"
                  {...register("name")}
                  className="h-14 bg-transparent border-zinc-800 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-lg mb-2 block">Email</Label>
              <Input
                placeholder="Enter your email here"
                {...register("email")}
                className="h-14 bg-transparent border-zinc-800 text-white"
              />
            </div>
            <div>
              <Label className="text-lg mb-2 block">Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password required",
                })}
                className="h-14 bg-transparent border-zinc-800 text-white"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg bg-orange-600 hover:bg-orange-700 rounded-md"
            >
              Register Now
            </Button>

            {/* Checkbox */}
            {/* <div className="flex gap-3 items-start text-sm text-zinc-400">
              <Checkbox />
              <p>
                I agree to the{" "}
                <span className="text-orange-500">Terms & Conditions</span>,{" "}
                <span className="text-orange-500">Privacy Policy</span> and
                anti-piracy policy.
              </p>
            </div> */}

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
