"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { rectangularBeamFormSchema } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import db from "@/lib/db";
import { v7 as uuid } from "uuid";
import Image from "next/image";
import rectangularBeamImg from "@/assets/rectangular-beam.png";

function CreateNewRectangularBeamForm({
  projectId,
}: Readonly<{ projectId: string }>) {
  const form = useForm<z.infer<typeof rectangularBeamFormSchema>>({
    resolver: zodResolver(rectangularBeamFormSchema),
    defaultValues: {
      width: 0.0,
      depth: 0.0,
      span: 0.0,
      quantity: 1,
    },
  });

  const handleFormSubmit = form.handleSubmit(
    async ({ width, depth, span, quantity }) => {
      await db.beams.add({
        parameters: JSON.stringify([width, depth, span]),
        name: `BM ${width}x${depth}x${span}`,
        projectId,
        quantity,
        type: "rectangular",
        id: uuid(),
      });

      await db.projects.update(projectId, {
        updatedAt: new Date(),
      });
    },
  );

  return (
    <div className="w-full flex flex-col gap-2 px-4 py-6 md:max-w-md bg-card m-auto">
      <div className="w-full h-56 md:h-72 relative my-4 dark:bg-slate-50/85 rounded-lg">
        <Image
          src={rectangularBeamImg}
          alt="Rectangular Beam"
          className="p-6"
          fill
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={handleFormSubmit}
          className="space-y-4"
          autoComplete="on"
          onReset={() => form.reset()}
        >
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>w</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step={0.001}
                    {...field}
                    onChange={(e) =>
                      form.setValue("width", Number(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>Width of the beam</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="depth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>d</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step={0.001}
                    {...field}
                    onChange={(e) =>
                      form.setValue("depth", Number(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>Depth of the beam</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="span"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Span</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step={0.001}
                    {...field}
                    onChange={(e) =>
                      form.setValue("span", Number(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>Span of the beam</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step={1}
                    {...field}
                    onChange={(e) =>
                      form.setValue("quantity", Number(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button type="submit" className=" flex-1">
              Analyse
            </Button>
            <Button
              type="reset"
              variant="outline"
              aria-description="Reset form"
              aria-label="Reset"
              className="group"
            >
              <RotateCw className="group-hover:rotate-[280deg] duration-500 delay-75 ease-in-out transition-transform" />
              <span className="sr-only">Reset</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateNewRectangularBeamForm;
