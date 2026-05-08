import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function ContinueLearningCard() {
  return (
    <Card className="md:col-span-2 bg-gradient-to-br from-orange-600 to-orange-800 border-0">
      <CardContent className="p-8 space-y-5">
        <h3 className="text-2xl font-bold">
          Continue Learning
        </h3>

        <p className="text-sm text-orange-100">
          You have 3 pending assignments in
          Advanced React Design Patterns.
        </p>

        <Button className="bg-white text-orange-600 hover:bg-zinc-100">
          Resume Batch
        </Button>
      </CardContent>
    </Card>
  );
}