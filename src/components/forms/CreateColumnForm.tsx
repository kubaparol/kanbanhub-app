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
} from "../ui";
import { Loader2 } from "lucide-react";

const createColumnFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name must be at most 255 characters"),
});

export type CreateColumnFormValues = z.infer<typeof createColumnFormSchema>;

export interface CreateColumnFormProps {
  initialValues?: CreateColumnFormValues;
  onFormSubmit: (values: CreateColumnFormValues) => void;
}

export const CreateColumnForm: FC<CreateColumnFormProps> = (props) => {
  const { initialValues, onFormSubmit } = props;

  const form = useForm<CreateColumnFormValues>({
    resolver: zodResolver(createColumnFormSchema),
    defaultValues: {
      name: initialValues?.name || "",
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
              <FormControl>
                <Input {...field} placeholder="My example column" />
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