import { ScrollArea } from "@/components/ui/scroll-area";

export default function LectureSidebar({
  sections,
  currentLecture,
  setCurrentLecture,
}) {
  return (
    <ScrollArea className="h-[calc(100vh-60px)] p-4">
      {sections.map((section) => (
        <div key={section._id} className="mb-5">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">
            {section.title}
          </h3>

          <div className="space-y-1">
            {section.lectures.map((lecture) => (
              <div
                key={lecture._id}
                onClick={() =>
                  setCurrentLecture({
                    ...lecture,
                    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                  })
                }
                className={`p-2 rounded-md text-sm cursor-pointer transition ${
                  currentLecture._id === lecture._id
                    ? "bg-purple-600 text-white"
                    : "hover:bg-zinc-800"
                }`}
              >
                {lecture.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}
