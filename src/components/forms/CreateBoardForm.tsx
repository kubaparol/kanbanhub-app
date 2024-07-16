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
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const createBoardFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name must be at most 255 characters"),
});

export type CreateBoardFormValues = z.infer<typeof createBoardFormSchema>;

export interface CreateBoardFormProps {
  onFormSubmit: (values: CreateBoardFormValues) => void;
}

export const CreateBoardForm: FC<CreateBoardFormProps> = (props) => {
  const { onFormSubmit } = props;

  const form = useForm<CreateBoardFormValues>({
    resolver: zodResolver(createBoardFormSchema),
    defaultValues: {
      name: "",
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
                <Input {...field} placeholder="My example board" />
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
