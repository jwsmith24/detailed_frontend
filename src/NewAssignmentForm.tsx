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

const formSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "invalid date provided",
  }),
  description: z.string(),
});

export default function NewAssignmentForm({ rosterId, setOpen }: { rosterId: number, setOpen: (open: boolean) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0], // grab YYYY-MM-DD
      description: "",
    },
  });

  const assignmentMutation = useCreateAssignment(rosterId);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("form submitted!");
    console.log(values);
    assignmentMutation.mutate(values);
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
