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
courseSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

/* Indexing */
courseSchema.index({ title: "text", description: "text" });
courseSchema.index({ instructor: 1 });

const courseModel = mongoose.model("Course", courseSchema);

export default courseModel;

// import { Schema, model } from "mongoose";

// const lectureSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     description: {
//       type: String,
//       trim: true,
//     },

//     video: {
//       public_id: {
//         type: String,
//         required: true,
//       },
//       secure_url: {
//         type: String,
//         required: true,
//       },
//     },

//     duration: {
//       type: Number,
//       required: true,
//       min: 1,
//     },

//     isPreview: {
//       type: Boolean,
//       trim: true,
//       default: false,
//     },

//     order: {
//       type: Number,
//     },
//   },
//   { timestamps: true },
// );

// const sectionSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     order: {
//       type: Number,
//     },

//     lectures: [lectureSchema],
//   },
//   { timestamps: true },
// );

// const courseSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       minlength: 8,
//       maxlength: 60,
//       trim: true,
//     },

//     description: {
//       type: String,
//       required: true,
//       minlength: 8,
//       maxlength: 200,
//       trim: true,
//     },

//     category: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     thumbnail: {
//       public_id: {
//         type: String,
//         required: true,
//       },
//       secure_url: {
//         type: String,
//         required: true,
//       },
//     },

//     sections: [sectionSchema],

//     totalLectures: {
//       type: Number,
//       default: 0,
//     },

//     totalDuration: {
//       type: Number,
//       default: 0,
//     },

//     createdBy: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     isPublished: {
//       type: Boolean,
//       trim: true,
//       default: false,
//     },

//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true },
// );

// // Search by title
// courseSchema.index({ title: 1 });

// // Browse published courses by category
// courseSchema.index({ category: 1, isPublished: 1 });

// // Instructor dashboard
// courseSchema.index({ createdBy: 1, isDeleted: 1 });

// // Latest courses
// courseSchema.index({ createdAt: -1 });

// courseSchema.pre("save", function (next) {
//   let totalLectures = 0;
//   let totalDuration = 0;

//   this.sections.forEach((section, secIndex) => {
//     // section order auto fix
//     if (section.order === undefined || section.order === null) {
//       section.order = secIndex + 1;
//     }

//     totalLectures += section.lectures.length;

//     section.lectures.forEach((lecture, lecIndex) => {
//       // lecture order auto fix
//       if (lecture.order === undefined || lecture.order === null) {
//         lecture.order = lecIndex + 1;
//       }

//       totalDuration += lecture.duration || 0;
//     });
//   });

//   this.totalLectures = totalLectures;
//   this.totalDuration = totalDuration;

//   next();
// });

// const courseModel = model("Course", courseSchema);

// export default courseModel;
