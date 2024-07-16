import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC } from "react";

export interface FooterProps extends ComponentPropsWithoutRef<"footer"> {}

export const Footer: FC<FooterProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <footer {...rest} className={cn("wrapper", className)}>
      <p className="text-center text-gray-500 text-xs">© 2024 KanbanHub</p>
    </footer>
  );
};
