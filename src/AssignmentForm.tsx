import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Button } from "@/components/ui/button.tsx";
import { useCreateAssignment } from "@/hooks/useCreateAssignment.ts";
import { useUpdateAssignment } from "@/hooks/useUpdateAssignment.ts";
import type { DutyAssignment } from "@/types/DutyAssignment.ts";

const formSchema = z.object({
  date: z.string(),
  description: z.string(),
});

export default function AssignmentForm({
  rosterId,
  assignment,
  setOpen,
  type,
}: {
  rosterId: number;
  assignment: DutyAssignment;
  setOpen: (open: boolean) => void;
  type: "new" | "edit";
}) {
  const today = new Date().toISOString().split("T")[0];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: assignment.date ?? today, // grab YYYY-MM-DD
      description: assignment.description ?? "",
    },
  });

  // POST
  const assignmentMutation = useCreateAssignment(rosterId);

  // PUT
  const assignmentUpdate = useUpdateAssignment(rosterId);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (type === "new") {
      console.log("form submitted for new assignment");
      console.log(values);
      assignmentMutation.mutate(values);
    } else {
      console.log("updating values...");
      if (!assignment.id) {
        throw new Error("Assignment id cannot be void for update");
      }
      const request = {
        ...values,
        id: assignment.id, // append id to form data
      };
      assignmentUpdate.mutate(request);
    }

    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name={"date"}
          render={({ field }) => (
            <FormItem>
              <FormLabel> Date </FormLabel>
              <FormControl>
                <Input type={"date"} {...field} />
              </FormControl>
              <FormDescription>
                Enter the date of the duty assignment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem>
              <FormLabel> Description </FormLabel>
              <FormControl>
                <Input placeholder={"Enter a description..."} {...field} />
              </FormControl>
              <FormDescription>
                Provide any important information about this specific duty.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type={"submit"}>Submit</Button>
      </form>
    </Form>
  );
}
