// models/course.model.js
import mongoose from "mongoose";
import slugify from "slugify";
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    subtitle: {
      type: String,
      trim: true,
      maxlength: 180,
      default: "",
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    language: {
      type: String,
      default: "English",
    },

    thumbnail: {
      url: String,
      public_id: String,
    },

    promoVideo: {
      url: String,
      public_id: String,
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    isFree: {
      type: Boolean,
      trim:true,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "published", "unpublished"],
      default: "draft",
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],

    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    totalLectures: {
      type: Number,
      default: 0,
    },

    totalDuration: {
      type: Number, // minutes
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    tags: [String],

    requirements: [String],

    learningOutcomes: [String],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

/* Auto Slug */
courseSchema.pre("save", function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

/* Indexing */
courseSchema.index({ title: "text", description: "text" });
courseSchema.index({ instructor: 1 });

const courseModel = mongoose.model("Course", courseSchema);

export default courseModel;
