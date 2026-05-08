import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CourseTabs({ description }) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="bg-zinc-900 border border-zinc-800">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-3">
        <div className="bg-zinc-900 p-4 rounded-xl text-gray-300">
          {description}
        </div>
      </TabsContent>

      <TabsContent value="notes" className="mt-3">
        <div className="bg-zinc-900 p-4 rounded-xl text-gray-400">
          Notes feature coming soon...
        </div>
      </TabsContent>
    </Tabs>
  );
}
