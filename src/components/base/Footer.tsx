import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC } from "react";

export interface FooterProps extends ComponentPropsWithoutRef<"footer"> {}

export const Footer: FC<FooterProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <footer {...rest} className={cn("bg-slate-400", className)}>
      Footer
    </footer>
  );
};
