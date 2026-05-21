import { useState } from "react";

import { motion } from "framer-motion";

import {
  ChevronDown,
  ChevronRight,
  PlayCircle,
  Plus,
  Trash2,
  Pencil,
  BookOpen,
  Clock3,
  GripVertical,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

export default function CourseCurriculum() {
  const [expandedSections, setExpandedSections] = useState([1]);

  /* ======================================
     MOCK DATA
  ====================================== */

  const curriculum = [
    {
      id: 1,
      title: "Introduction to MERN Stack",
      totalLectures: 4,
      totalDuration: 45,
      lectures: [
        {
          id: 1,
          title: "Course Introduction",
          duration: 5,
          isPreviewFree: true,
        },

        {
          id: 2,
          title: "How This Course Works",
          duration: 10,
          isPreviewFree: false,
        },

        {
          id: 3,
          title: "Project Overview",
          duration: 15,
          isPreviewFree: false,
        },
      ],
    },

    {
      id: 2,
      title: "React Fundamentals",
      totalLectures: 8,
      totalDuration: 120,
      lectures: [
        {
          id: 1,
          title: "React Introduction",
          duration: 12,
          isPreviewFree: true,
        },

        {
          id: 2,
          title: "JSX Deep Dive",
          duration: 20,
          isPreviewFree: false,
        },
      ],
    },
  ];

  /* ======================================
     TOGGLE SECTION
  ====================================== */

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-400">
            <BookOpen className="w-4 h-4" />
            Curriculum Builder
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mt-5 leading-tight">
            Course
            <span className="text-orange-500"> Curriculum</span>
          </h1>

          <p className="text-zinc-400 mt-4 max-w-2xl">
            Organize sections and lectures to structure your course learning
            experience.
          </p>
        </div>

        {/* CURRICULUM */}

        <div className="space-y-6">
          {curriculum?.map((section, index) => {
            const isExpanded = expandedSections.includes(section.id);

            return (
              <motion.div
                key={section.id}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                <Card className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
                  {/* SECTION HEADER */}

                  <div className="border-b border-zinc-800 bg-zinc-900/40">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 px-5 py-5">
                      {/* LEFT */}

                      <div className="flex items-start gap-4">
                        {/* DRAG */}

                        <GripVertical className="w-5 h-5 text-zinc-500 mt-2 cursor-grab" />

                        {/* ORDER */}

                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 font-semibold">
                          {index + 1}
                        </div>

                        {/* INFO */}

                        <div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleSection(section.id)}
                              className="text-zinc-400 hover:text-white transition"
                            >
                              {isExpanded ? (
                                <ChevronDown className="w-5 h-5" />
                              ) : (
                                <ChevronRight className="w-5 h-5" />
                              )}
                            </button>

                            <h2 className="text-xl font-semibold">
                              {section.title}
                            </h2>
                          </div>

                          {/* META */}

                          <div className="flex flex-wrap items-center gap-5 mt-3 text-sm text-zinc-500">
                            <div className="flex items-center gap-2">
                              <Video className="w-4 h-4" />
                              {section.totalLectures} Lectures
                            </div>

                            <div className="flex items-center gap-2">
                              <Clock3 className="w-4 h-4" />
                              {section.totalDuration} mins
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ACTIONS */}

                      <div className="flex flex-wrap items-center gap-3">
                        <Button
                          variant="outline"
                          className="border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit Section
                        </Button>

                        <Button variant="destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* LECTURES */}

                  {isExpanded && (
                    <CardContent className="p-5 space-y-4">
                      {section.lectures.map((lecture, lectureIndex) => (
                        <motion.div
                          key={lecture.id}
                          initial={{
                            opacity: 0,
                            y: 5,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className="
                              bg-zinc-900
                              border
                              border-zinc-800
                              rounded-2xl
                              p-5
                            "
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                            {/* LEFT */}

                            <div className="flex items-start gap-4">
                              {/* DRAG */}

                              <GripVertical className="w-5 h-5 text-zinc-500 mt-2 cursor-grab" />

                              {/* NUMBER */}

                              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 font-medium">
                                {lectureIndex + 1}
                              </div>

                              {/* INFO */}

                              <div>
                                <div className="flex items-center gap-3 flex-wrap">
                                  <PlayCircle className="w-5 h-5 text-orange-500" />

                                  <h3 className="font-medium text-lg">
                                    {lecture.title}
                                  </h3>

                                  {lecture.isPreviewFree && (
                                    <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                                      Free Preview
                                    </span>
                                  )}
                                </div>

                                {/* META */}

                                <div className="flex items-center gap-5 mt-3 text-sm text-zinc-500">
                                  <div className="flex items-center gap-2">
                                    <Clock3 className="w-4 h-4" />
                                    {lecture.duration} mins
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* ACTIONS */}

                            <div className="flex flex-wrap items-center gap-3">
                              <Button
                                variant="outline"
                                className="border-zinc-700 bg-black text-white hover:bg-zinc-800"
                              >
                                <Pencil className="w-4 h-4 mr-2" />
                                Edit
                              </Button>

                              <Button variant="destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {/* ADD LECTURE */}

                      <Button
                        className="
                          w-full
                          h-14
                          bg-orange-500
                          hover:bg-orange-600
                          text-white
                          rounded-2xl
                        "
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Lecture
                      </Button>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            );
          })}

          {/* ADD SECTION */}

          <Button
            className="
              w-full
              h-16
              border-dashed
              border-zinc-700
              bg-zinc-950
              hover:bg-zinc-900
              text-white
              rounded-3xl
              border-2
            "
            variant="outline"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Section
          </Button>
        </div>

        {/* FOOTER ACTIONS */}

        <div className="sticky bottom-0 bg-black/80 backdrop-blur-md py-6 mt-10">
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              variant="outline"
              className="border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 h-12 px-6"
            >
              Save Draft
            </Button>

            <Button className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-8">
              Publish Curriculum
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
