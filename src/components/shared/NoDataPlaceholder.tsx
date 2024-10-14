import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC } from "react";

export interface NoDataPlaceholderProps
  extends ComponentPropsWithoutRef<"div"> {
  title: string;
  description: string;
}

export const NoDataPlaceholder: FC<NoDataPlaceholderProps> = (props) => {
  const { title, description, className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn("flex-center flex-col gap-4 text-center p-16", className)}
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};
