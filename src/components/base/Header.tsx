import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC } from "react";
import { Logo } from "./Logo";
import { ModeToggle } from "../shared/mode-toggle";

export interface HeaderProps extends ComponentPropsWithoutRef<"header"> {}

export const Header: FC<HeaderProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <header {...rest} className={cn("border-b", className)}>
      <div className="wrapper flex-between">
        <Logo />

        <ModeToggle />
      </div>
    </header>
  );
};
