import React, { useState } from "react";
import { statuses } from "./Dashboard";
import '../App.css';

const AddTaskModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onSave({ title, description, status });
  };

  return (
    <div
      className="addtask_modal"
    >
      <form
        onSubmit={handleSubmit}
        className="addtask_form"
      >
        <h2 className="addtask_heading">Add New Task</h2>
        <input
          className="modal-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          className="modal-input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <select className="modal-select modal-input" value={status} onChange={(e) => setStatus(e.target.value)}>
          {statuses.map((stat,i)=>
           <option key={i}>{stat}</option>
          )}
        </select>
        <br /><br />
        <button className="button_container btn-clr" type="submit">
          Save
        </button>
        <button
          className="button_container"
          type="button"
          onClick={onClose}
          style={{ marginLeft: "1rem" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddTaskModal;
