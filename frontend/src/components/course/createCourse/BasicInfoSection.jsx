import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { categories } from "@/constants/courseCategory";

import ThumbnailUpload from "./ThumbnailUpload";

export default function BasicInfoSection({
  register,
  errors,
  setValue,
  selectedCategory,
  setSelectedCategory,
  thumbnailPreview,
  handleThumbnailChange,
  fileInputRef,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
    >
      <Card className="bg-zinc-950 border border-zinc-800 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-white text-2xl">
            Basic Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* TITLE */}

          <div className="space-y-2">
            <Label className="text-zinc-300">Course Title</Label>

            <Input
              placeholder="Complete MERN Stack Course"
              {...register("title")}
              className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 h-12"
            />

            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* SUBTITLE */}

          <div className="space-y-2">
            <Label className="text-zinc-300">Subtitle</Label>

            <Input
              placeholder="Master full-stack development"
              {...register("subtitle")}
              className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 h-12"
            />
          </div>

          {/* DESCRIPTION */}

          <div className="space-y-2">
            <Label className="text-zinc-300">Description</Label>

            <Textarea
              rows={7}
              placeholder="Write detailed course description..."
              {...register("description")}
              className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
            />

            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* CATEGORY / LEVEL / LANGUAGE */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* CATEGORY */}

            <div className="space-y-2">
              <Label className="text-zinc-300">Category</Label>

              <Select
                onValueChange={(value) => {
                  setSelectedCategory(value);

                  if (value !== "Other") {
                    setValue("category", value);
                  }
                }}
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white h-12">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>

                <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedCategory === "Other" && (
                <Input
                  placeholder="Enter custom category"
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 mt-3 h-12"
                  onChange={(e) => setValue("category", e.target.value)}
                />
              )}
            </div>

            {/* LEVEL */}

            <div className="space-y-2">
              <Label className="text-zinc-300">Level</Label>

              <Select
                defaultValue="beginner"
                onValueChange={(value) => setValue("level", value)}
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white h-12">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectItem value="beginner">Beginner</SelectItem>

                  <SelectItem value="intermediate">Intermediate</SelectItem>

                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* LANGUAGE */}

            <div className="space-y-2">
              <Label className="text-zinc-300">Language</Label>

              <Select
                defaultValue="English"
                onValueChange={(value) => setValue("language", value)}
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white h-12">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectItem value="English">English</SelectItem>

                  <SelectItem value="Hindi">Hindi</SelectItem>

                  <SelectItem value="Hinglish">Hinglish</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* THUMBNAIL */}

          <ThumbnailUpload
            thumbnailPreview={thumbnailPreview}
            handleThumbnailChange={handleThumbnailChange}
            fileInputRef={fileInputRef}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
