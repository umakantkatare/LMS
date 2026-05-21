import { UploadCloud } from "lucide-react";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

export default function ThumbnailUpload({
  thumbnailPreview,
  handleThumbnailChange,
  fileInputRef,
}) {
  return (
    <div className="space-y-3">
      <Label className="text-zinc-300">Course Thumbnail</Label>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="
          border-2 border-dashed border-zinc-700
          rounded-3xl
          p-8
          bg-zinc-900/50
          flex
          flex-col
          items-center
          justify-center
          text-center
          cursor-pointer
          hover:border-orange-500
          hover:bg-zinc-900
          transition-all
          duration-300
        "
      >
        <UploadCloud className="w-12 h-12 text-orange-500 mb-4" />

        <h3 className="font-semibold text-lg">Upload Thumbnail</h3>

        <p className="text-sm text-zinc-500 mt-2">PNG, JPG or WEBP up to 5MB</p>

        {/* HIDDEN INPUT */}

        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="hidden"
        />

        {/* PREVIEW */}

        {thumbnailPreview && (
          <img
            src={thumbnailPreview}
            alt="thumbnail-preview"
            className="
              w-full
              max-w-md
              h-56
              object-cover
              rounded-2xl
              mt-5
              border
              border-zinc-700
            "
          />
        )}
      </div>
    </div>
  );
}
