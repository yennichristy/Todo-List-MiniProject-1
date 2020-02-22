import React, { useState } from "react";

const EditBoard = () => {
  const [EditData, setEditData] = useState({
    name: "",
    description: "",
    dueDate: ""
  });

  const changeEdit = e => {
    setEditData({
      [e.target.name]: e.target.value
    });
  };

  return (
    <form>
      <p>Title:</p>
      <input
        type="text"
        name="name"
        value={EditData.name}
        onChange={changeEdit}
      />
      <p>Description:</p>
      <input
        type="text"
        name="description"
        value={EditData.description}
        onChange={changeEdit}
      />
      <p>Due Date:</p>
      <input
        type="text"
        name="dueDate"
        value={EditData.dueDate}
        onChange={changeEdit}
      />
      <div>
        <button>Cancel</button>
        <button>Save Changes</button>
      </div>
    </form>
  );
};

export default EditBoard;
