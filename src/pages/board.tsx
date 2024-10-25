import { FC } from "react";
import { useParams } from "react-router-dom";
import { BoardTemplate } from "@/components/templates/BoardTemplate";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const BoardPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <DndProvider backend={HTML5Backend}>
      <BoardTemplate id={id} />
    </DndProvider>
  );
};

export default BoardPage;
