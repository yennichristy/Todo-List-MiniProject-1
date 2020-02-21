import React, { useState } from "react";
import "../styles/NewTask.scss";

const NewTask = () => {
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    dueDate: ""
  });

  const change = e => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bigcon">
      <div>
        <div className="newcon">
          <div className="exit">
            <button className="exit--btn">X</button>
          </div>
          <form className="taskform">
            <p className="taskform--title">Title:</p>
            <input
              className="areas"
              type="text"
              name="name"
              onChange={change}
              value={newTask.name}
            ></input>
            <p className="titlearea">Description:</p>
            <textarea className="descarea" name="description"></textarea>
            <p className="taskform--title">Due date:</p>
            <input
              className="areadate"
              type="date"
              name="dueDate"
              onChange={change}
              value={newTask.dueDate}
            ></input>
            <div className="submit">
              <button className="submit--btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
