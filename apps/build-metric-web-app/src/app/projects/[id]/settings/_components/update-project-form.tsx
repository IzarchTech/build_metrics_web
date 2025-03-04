"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectEntity } from "@/lib/types";
import { updateProjectFormSchema } from "@/lib/schemas";
import db from "@/lib/db";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

function UpdateProjectForm({ project }: Readonly<{ project: ProjectEntity }>) {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof updateProjectFormSchema>>({
    resolver: zodResolver(updateProjectFormSchema),
    defaultValues: {
      description: project.description ?? "",
      title: project.name,
    },
  });

  const handleFormSubmit = form.handleSubmit(({ description, title }) => {
    setIsSaving(true);
    db.projects
      .update(project.id, {
        description,
        name: title.trim(),
        updatedAt: new Date(),
      })
      .then(() => {
        toast.success("Project updated successfully", {
          position: "top-right",
        });
      })
      .catch((err) => {
        console.error("UpdateProjectError --->", err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  });

  const disableForm = useMemo(() => {
    const { description: newDescription, title: newTitle } = form.getValues();

    return (
      newDescription === project.description && newTitle.trim() === project.name
    );
  }, [form.getValues(), project.description, project.name]);

  return (
    <div className="m-auto w-full md:max-w-md">
      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Textarea rows={8} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isSaving || disableForm}
          >
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default UpdateProjectForm;
