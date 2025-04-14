import React from "react";
import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString(),
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    padding: "10px",
    margin: "10px 0",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <strong>{task.title}</strong>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskCard;
