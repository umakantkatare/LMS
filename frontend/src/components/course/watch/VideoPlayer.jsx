import { Card } from "@/components/ui/card";

export default function VideoPlayer({ lecture }) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
      <video
        src={lecture.videoUrl}
        controls
        className="w-full h-[220px] md:h-[400px] lg:h-[500px]"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold">{lecture.title}</h2>
      </div>
    </Card>
  );
}
