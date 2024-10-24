import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC } from "react";
import { Logo } from "./Logo";

export interface HeaderProps extends ComponentPropsWithoutRef<"header"> {}

export const Header: FC<HeaderProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <header {...rest} className={cn("wrapper", className)}>
      <Logo />
    </header>
  );
};
