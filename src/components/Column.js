import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import '../App.css';

const Column = ({ id, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="task_column"
    >
      <h3>{id}</h3>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;
