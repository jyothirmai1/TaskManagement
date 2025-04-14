import React, { useEffect, useState } from "react";
import Column from "./Column";
import AddTaskModal from "./AddTaskModal";
import axios from "axios";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";

export const statuses = ["To Do", "In Progress", "Done"];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:3001/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdd = async (newTask) => {
    const res = await axios.post("http://localhost:3001/tasks", newTask);
    setTasks([...tasks, res.data]);
    setShowModal(false);
  };

  const updateTask = async (updatedTask) => {
    await axios.put(
      `http://localhost:3001/tasks/${updatedTask.id}`,
      updatedTask
    );
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id;
    const newStatus = over.id;
    const task = tasks.find((t) => t.id.toString() === taskId);
    if (task.status !== newStatus) {
      const updated = { ...task, status: newStatus };
      updateTask(updated);
    }
  };

  return (
    <div className="board_container">
      <div className="board-btn_container">
        <button
          className="button_container btn-clr"
          style={{ float: "right" }}
          onClick={() => setShowModal(true)}
        >
          Add New Task
        </button>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <div
          className="drag_container"
        >
          {statuses.map((status) => (
            <Column
              key={status}
              id={status}
              tasks={tasks.filter((task) => task.status === status)}
            />
          ))}
        </div>
      </DndContext>

      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          onSave={handleTaskAdd}
        />
      )}
    </div>
  );
};

export default Dashboard;
