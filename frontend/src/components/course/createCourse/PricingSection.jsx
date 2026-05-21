import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";

export default function PricingSection({ isFree, setValue, register }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
    >
      <Card className="bg-zinc-950 border border-zinc-800 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Pricing</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div>
              <h3 className="font-medium">Free Course</h3>

              <p className="text-sm text-zinc-500 mt-1">
                Enable if this course is free.
              </p>
            </div>

            <Switch
              checked={isFree}
              onCheckedChange={(value) => setValue("isFree", value)}
            />
          </div>

          {!isFree && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* PRICE */}

              <div className="space-y-2">
                <Label className="text-zinc-300">Price</Label>

                <Input
                  type="number"
                  placeholder="999"
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                  className="bg-zinc-900 border-zinc-700 text-white h-12"
                />
              </div>

              {/* DISCOUNT PRICE */}

              <div className="space-y-2">
                <Label className="text-zinc-300">Discount Price</Label>

                <Input
                  type="number"
                  placeholder="499"
                  {...register("discountPrice", {
                    valueAsNumber: true,
                  })}
                  className="bg-zinc-900 border-zinc-700 text-white h-12"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
