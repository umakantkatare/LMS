import { Schema, model } from "mongoose";

const lectureSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    video: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    isPreview: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
    },
  },
  { timestamps: true },
);

const sectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    order: {
      type: Number,
    },

    lectures: [lectureSchema],
  },
  { timestamps: true },
);

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minLength: 8,
      maxLength: 60,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 200,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    thumbnail: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },

    sections: [sectionSchema],

    totalLectures: {
      type: Number,
      default: 0,
    },

    totalDuration: {
      type: Number,
      default: 0,
    },

    createdBy: {
      // type: Schema.Types.ObjectId,
      type: String,
      // ref: "User",
      required: true,
      index: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// ---

// # 🔥 CRITICAL FIX: AUTO CALCULATION (MOST IMPORTANT)

courseSchema.pre("save", function () {
  let totalLectures = 0;
  let totalDuration = 0;

  this.sections.forEach((section) => {
    totalLectures += section.lectures.length;

    section.lectures.forEach((lec, index) => {
      // auto order fix
      if (lec.order === undefined) {
        lec.order = index + 1;
      }

      totalDuration += lec.duration || 0;
    });

    // section order fix
    if (section.order === undefined) {
      section.order = this.sections.indexOf(section) + 1;
    }
  });

  this.totalLectures = totalLectures;
  this.totalDuration = totalDuration;

  // next();
});

const courseModel = model("Course", courseSchema);

export default courseModel;

// const courseSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "title is required"],
//       minLength: [8, "title must be atleast 8 characters"],
//       maxLength: [60, "title should be less than 60 characters"],
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: [true, "description is required"],
//       minLength: [8, "description must be atleast 8 characters"],
//       maxLength: [200, "description should be less than 60 characters"],
//       trim: true,
//     },
//     category: {
//       type: String,
//       required: [true, "category is required"],
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
//     lectures: [
//       {
//         title: String,
//         description: String,
//         lecture: {
//           public_id: {
//             type: String,
//             required: true,
//           },
//           secure_url: {
//             type: String,
//             required: true,
//           },
//         },
//       },
//     ],
//     numbersOfLectures: {
//       type: Number,
//       default: 0,
//     },
//     createdBy: {
//       type: String,
//       required: [true],
//     },
//   },
//   { timestamps: true },
// );
