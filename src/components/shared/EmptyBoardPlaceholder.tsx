import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC } from "react";

export interface EmptyBoardPlaceholderProps
  extends ComponentPropsWithoutRef<"div"> {}

export const EmptyBoardPlaceholder: FC<EmptyBoardPlaceholderProps> = (
  props
) => {
  const { className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn("flex-center flex-col gap-4 text-center p-16", className)}
    >
      <h2 className="text-2xl font-semibold">No columns found</h2>
      <p className="text-gray-500">Create a new column to get started</p>
    </div>
  );
};
