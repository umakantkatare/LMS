import { Button } from "@/components/ui/button";

export default function CourseActions() {
  return (
    <div className="sticky bottom-0 bg-black/80 backdrop-blur-md py-5">
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Button
          type="button"
          variant="outline"
          className="border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 h-12 px-6"
        >
          Save Draft
        </Button>

        <Button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-8"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
