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
  Select,
  FormLabel,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Skeleton,
} from "../ui";
import { Loader2 } from "lucide-react";
import { useGetBoardQuery } from "@/lib";

const createTaskFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name must be at most 255 characters"),
  columnId: z.string(),
});

export type CreateTaskFormValues = z.infer<typeof createTaskFormSchema>;

export interface CreateTaskFormProps {
  boardId: string;
  initialValues?: Partial<CreateTaskFormValues>;
  onFormSubmit: (values: CreateTaskFormValues) => void;
}

export const CreateTaskForm: FC<CreateTaskFormProps> = (props) => {
  const { boardId, initialValues, onFormSubmit } = props;

  const { data: board, isFetching: isGettingBoard } = useGetBoardQuery({
    id: boardId,
  });

  const form = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: {
      name: initialValues?.name || "",
      columnId: initialValues?.columnId || "",
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
                <Input {...field} placeholder="My example column" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="columnId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Column</FormLabel>

              {isGettingBoard && <Skeleton className="h-10" />}

              {!isGettingBoard && (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a parent"></SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {board?.columns?.map((board) => (
                      <SelectItem key={board.id} value={board.id}>
                        {board.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Loading..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};
