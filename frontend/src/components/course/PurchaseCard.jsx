import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle2, Clock3 } from "lucide-react";

export default function PurchaseCard({ course }) {
  console.log('purchase:', course);
  return (
    <div className="lg:-mt-44 relative z-20">
      <Card className="rounded-2xl shadow-xl overflow-hidden sticky top-24">
        {/* Thumbnail */}
        <img
          src={course?.thumbnail?.url}
          alt={course?.title}
          className="w-full h-56 object-cover"
        />

        <CardContent className="p-5 space-y-5">
          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-primary">
              ₹{course?.price}
            </span>

            {course?.originalPrice && (
              <span className="text-slate-400 line-through">
                ₹{course?.originalPrice}
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button className="w-full h-11 text-base">Enroll Now</Button>

            <Button variant="outline" className="w-full h-11 text-base">
              Add to Wishlist
            </Button>
          </div>

          {/* Includes */}
          <div className="space-y-3 text-sm text-slate-600">
            <h3 className="font-semibold text-slate-900">
              This course includes:
            </h3>

            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4" />
                {course?.duration} on-demand video
              </p>

              <p className="flex items-center gap-2">
                <Clock3 className="w-4 h-4" />
                Full lifetime access
              </p>

              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Certificate of completion
              </p>

              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Access on mobile & desktop
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
