import { motion } from "framer-motion";

import { Plus, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export default function DynamicSection({
  title,
  fields,
  register,
  append,
  remove,
  fieldName,
  placeholder,
}) {
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
          <CardTitle className="text-white text-2xl">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-3">
              <Input
                placeholder={placeholder}
                {...register(`${fieldName}.${index}.value`)}
                className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 h-12"
              />

              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ value: "" })}
            className="border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
          >
            <Plus className="w-4 h-4 mr-2" />

            Add {title.endsWith("s") ? title.slice(0, -1) : title}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}