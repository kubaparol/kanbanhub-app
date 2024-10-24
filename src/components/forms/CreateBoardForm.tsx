import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Button,
  FormLabel,
  Textarea,
} from "../ui";
import { Loader2 } from "lucide-react";

const createBoardFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name must be at most 255 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(500, "Description must be at most 500 characters"),
});

export type CreateBoardFormValues = z.infer<typeof createBoardFormSchema>;

export interface CreateBoardFormProps {
  initialValues?: CreateBoardFormValues;
  onFormSubmit: (values: CreateBoardFormValues) => void;
}

export const CreateBoardForm: FC<CreateBoardFormProps> = (props) => {
  const { initialValues, onFormSubmit } = props;

  const form = useForm<CreateBoardFormValues>({
    resolver: zodResolver(createBoardFormSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g., Marketing Campaign Q4 Board"
                />
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
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Textarea
                  {...field}
                  placeholder="e.g., Manage tasks, track progress, and collaborate with the team on the Q4 marketing campaign"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Loading..." : "Create"}
        </Button>
      </form>
    </Form>
  );
};
