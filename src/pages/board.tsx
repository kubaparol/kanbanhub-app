import { FC } from "react";
import { useParams } from "react-router-dom";
import { BoardTemplate } from "@/components/templates/BoardTemplate";

const BoardPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  return <BoardTemplate id={id} />;
};

export default BoardPage;
