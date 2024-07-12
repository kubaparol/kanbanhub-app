import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC } from "react";

export interface HeaderProps extends ComponentPropsWithoutRef<"header"> {}

export const Header: FC<HeaderProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <header {...rest} className={cn("bg-slate-400", className)}>
      Header
    </header>
  );
};
