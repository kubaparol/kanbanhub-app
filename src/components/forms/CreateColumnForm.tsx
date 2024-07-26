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
import { useGetBoardsQuery } from "@/lib";

const createColumnFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name must be at most 255 characters"),
  boardId: z.string(),
});

export type CreateColumnFormValues = z.infer<typeof createColumnFormSchema>;

export interface CreateColumnFormProps {
  initialValues?: Partial<CreateColumnFormValues>;
  onFormSubmit: (values: CreateColumnFormValues) => void;
}

export const CreateColumnForm: FC<CreateColumnFormProps> = (props) => {
  const { initialValues, onFormSubmit } = props;

  const { data: boards, isFetching: isGettingBoards } = useGetBoardsQuery();

  const form = useForm<CreateColumnFormValues>({
    resolver: zodResolver(createColumnFormSchema),
    defaultValues: {
      name: initialValues?.name || "",
      boardId: initialValues?.boardId || "",
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
          name="boardId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board</FormLabel>

              {isGettingBoards && <Skeleton className="h-10" />}

              {!isGettingBoards && (
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
                    {boards?.map((board) => (
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
          {isSubmitting ? "Loading..." : "Create"}
        </Button>
      </form>
    </Form>
  );
};
