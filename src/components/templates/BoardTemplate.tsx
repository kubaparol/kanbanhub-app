import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Link } from "react-router-dom";
import { AppUrls } from "@/router/urls";
import { Slash } from "lucide-react";
import { useGetBoardQuery } from "@/lib";
import { Skeleton } from "../ui/skeleton";

export interface BoardTemplateProps
  extends ComponentPropsWithoutRef<"section"> {
  id?: string;
}

export const BoardTemplate: FC<BoardTemplateProps> = (props) => {
  const { id, className, ...rest } = props;

  const { data: board, isFetching: isGettingBoard } = useGetBoardQuery({ id });

  console.log(board);

  return (
    <section {...rest} className={cn("wrapper grid gap-14", className)}>
      {isGettingBoard && <Skeleton className="h-5 w-72" />}

      {!isGettingBoard && board && (
        <header className="flex-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to={AppUrls.home}>Home</Link>
              </BreadcrumbItem>

              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>

              <BreadcrumbItem>
                <BreadcrumbPage>{board.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
      )}
    </section>
  );
};
