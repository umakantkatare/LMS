import React, { useState } from "react";
import HomeLayout from "@/layout/HomeLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { createCourse } from "@/store/slices/course/courseSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    console.log("course img file", file);
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.thumbnail ||
      !formData.createdBy
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("createdBy", formData.createdBy);
    data.append("thumbnail", formData.thumbnail);

    console.log("Submitting:", Object.fromEntries(data));

    const response = await dispatch(createCourse(data));
    if (response?.payload?.success) {
      setFormData({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null,
      });
      navigate("/course");
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-screen bg-muted flex justify-center items-center px-4 py-8">
        <Card className="w-full max-w-4xl shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Create New Course
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label>Course Title</Label>
                <Input
                  name="title"
                  placeholder="Enter course title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  name="description"
                  placeholder="Write course description..."
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-30"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  name="category"
                  placeholder="e.g. Web Development"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Created By */}
              <div className="space-y-2">
                <Label>Created By</Label>
                <Input
                  name="createdBy"
                  placeholder="Instructor name"
                  value={formData.createdBy}
                  onChange={handleChange}
                  required
                  // disabled={!!data?.name} // 🔥 lock if coming from auth
                />
              </div>

              {/* Thumbnail Upload */}
              <div className="space-y-2">
                <Label>Thumbnail</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnail}
                />

                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full max-h-60 object-cover rounded-lg mt-2"
                  />
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Create Course</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </HomeLayout>
  );
};

export default CreateCourse;
