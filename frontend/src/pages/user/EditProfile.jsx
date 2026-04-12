// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { useSelector } from "react-redux";

// const EditProfile = () => {
//   const  data  = useSelector((state) => state.auth?.data);

//   const [formData, setFormData] = useState({
//     fullName: data?.fullName || "",
//     email: data?.email || "",
//     avatar: data?.avatar?.secure_url || "",
//     file: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prev) => ({
//         ...prev,
//         file,
//         avatar: URL.createObjectURL(file),
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // API call yaha add karna hai
//     console.log("Updated Data:", formData);
//   };

//   return (
//     <Dialog>
//       {/* <DialogTrigger asChild> */}
//         <Button type='button' variant="outline">Edit Profile</Button>
//       {/* </DialogTrigger> */}

//       <DialogContent className="sm:max-w-[500px] rounded-2xl">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-semibold">
//             Edit Profile
//           </DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* Avatar */}
//           <div className="flex flex-col items-center gap-3">
//             <Avatar className="h-20 w-20">
//               <AvatarImage src={formData.avatar} />
//               <AvatarFallback>
//                 {formData.fullName?.charAt(0)?.toUpperCase()}
//               </AvatarFallback>
//             </Avatar>

//             <Input
//               type="file"
//               accept="image/*"
//               onChange={handleAvatarChange}
//               className="max-w-[250px]"
//             />
//           </div>

//           {/* Full Name */}
//           <div className="space-y-2">
//             <Label>Full Name</Label>
//             <Input
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               placeholder="Enter your name"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="space-y-2">
//             <Label>Email</Label>
//             <Input
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           {/* Role (Readonly) */}
//           <div className="space-y-2">
//             <Label>Role</Label>
//             <Input value={data?.role} disabled />
//           </div>

//           {/* Actions */}
//           <div className="flex justify-end gap-3">
//             <Button type="button" variant="ghost">
//               Cancel
//             </Button>
//             <Button type="submit">
//               Save Changes
//             </Button>
//           </div>

//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EditProfile;

import HomeLayout from "@/layout/HomeLayout";
import { editProfile, getProfile } from "@/store/slices/auth/authSlice";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    console.log(data);
    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    if (data.fullName.length < 5) {
      toast.error("Name cannot be of less than 5 characters");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);
    console.log(formData.entries().next());
    console.log(formData.entries().next());
    await dispatch(editProfile([data.userId, formData]));

    await dispatch(getProfile());

    navigate("/user/profile");
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-screen">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-105 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-semibold">Edit profile</h1>
          <label className="cursor-pointer" htmlFor="image_uploads">
            {data.previewImage ? (
              <img
                className="w-28 h-28 rounded-full m-auto"
                src={data.previewImage}
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={handleImageUpload}
            className="hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .png, .svg, .jpeg"
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="text-lg font-semibold">
              Full Name
            </label>
            <input
              required
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your name"
              className="bg-transparent px-2 py-1 border"
              value={data.fullName}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer"
          >
            Update profile
          </button>
          <Link to="/user/profile">
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
              <AiOutlineArrowLeft /> Go back to profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;
