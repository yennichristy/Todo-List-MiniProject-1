import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/DashBoard.scss";
import picts from "../../pictures/sunflower.jpeg";
import AddModal from "../AddModal";
// import { getAllTodos, deleteTodo, postNewTodos } from "../helpers/crudTodos";

const DashBoardPage = () => {
  let baseUrl = "https://miniprojectc.herokuapp.com/api/v1";
  const [checkBox, setCheckBox] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [post, setPost] = useState({
    name: "",
    description: ""
  });
  const [complete, setComplete] = useState({
    id: "",
    completion: null
  });

  const change = () => {
    setCheckBox({
      checkBox: !checkBox
    });
  };

  const changePost = e => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  //get data by id
  // data masukkan ke form edit -> insert to data edit form

  const getId = async id => {
    let token = localStorage.getItem("token");

    try {
      const getIdRes = await fetch(`${baseUrl}/tasks/id`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });
      const dataGetId = await getIdRes.json();
      console.log(dataGetId);
    } catch (error) {
      console.log(error);
    }
  };

  const updateComplete = async id => {
    let token = localStorage.getItem("token");
    const completeTask = {
      id: complete.id,
      completion: complete.completion
    };

    try {
      let completeres = await fetch(`${baseUrl}/tasks/update/completion`, {
        method: "PUT",
        headers: {
          "Content Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        },
        body: JSON.stringify({ completeTask })
      });
      const complete = await completeres.json();
      console.log(complete);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTodos = async () => {
    let token = localStorage.getItem("token");
    try {
      let response = await fetch(`${baseUrl}/tasks?limit=10&page=1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "appplication/json"
        }
      });
      const data = await response.json();
      setTodos(data.data.docs);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async id => {
    console.log("id", id);
    let token = localStorage.getItem("token");
    try {
      const delres = await fetch(`${baseUrl}/tasks`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "appplication/json"
        },
        body: JSON.stringify({ id })
      });
      await delres.json();
      setTodos(todos.filter(item => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const postNewTodos = async e => {
    e.preventDefault();
    console.log("post");
    let token = localStorage.getItem("token");
    const newPost = {
      name: post.name,
      description: post.description,
      dueDate: "2020-03-24T17:27:16.586Z"
    };
    try {
      let postresponse = await fetch(`${baseUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "appplication/json"
        },
        body: JSON.stringify(newPost)
      });
      await postresponse.json();
      await getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };

  let lists = todos.map(item => (
    <div className="tasklist" key={item._id}>
      <input
        className="check"
        type="checkbox"
        name="checkMe"
        value={checkBox}
        onChange={change}
      />
      <p className="title">{item.name}</p>
      <div className="icons">
        <div className="star">
          <i className="fa far fa-star"></i>
        </div>
        <div className="editt">
          <i className="fa fas fa-edit" onClick={() => getId(item._id)}></i>
        </div>
        <div className="trash">
          <i
            className="fa fas fa-trash"
            onClick={() => deleteTodo(item._id)}
          ></i>
        </div>
      </div>
    </div>
  ));

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="dashbigcon">
      <AddModal isOpen={modalOpen}>
        <div className="bigcon">
          <div>
            <div className="newcon">
              <div className="exit">
                <button className="exit--btn" onClick={closeModal}>
                  X
                </button>
              </div>
              <div>
                <form className="taskform" onSubmit={postNewTodos}>
                  <p className="taskform--title">Title:</p>
                  <input
                    className="areas"
                    type="text"
                    name="name"
                    value={post.name}
                    onChange={changePost}
                  />
                  <p className="titlearea">Description:</p>
                  <input
                    className="descarea"
                    type="text"
                    name="description"
                    value={post.description}
                    onChange={changePost}
                  />
                  <p className="taskform--title">Due date:</p>
                  <input
                    className="areadate"
                    type="date"
                    name="dueDate"
                    value={post.dueDate}
                    onChange={changePost}
                  />
                  <div className="submit">
                    <button className="submit--btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AddModal>
      <div className="dashcon">
        <div className="dashtop">
          <h6 className="dashtop__left">Todos</h6>
          <Link to="/">
            <button className="dashtop__right">Sign Out</button>
          </Link>
        </div>
        <div className="dashbottom">
          <div className="dashbottom_left">
            <div className="profile">
              <img className="propic" src={picts} alt="profile"></img>
              <h5>Name</h5>
            </div>
            <div className="menu">
              <h5>My day</h5>
              <h5>Important</h5>
              <h5>Completed</h5>
            </div>
          </div>
          <div className="dashbottom_right">
            {/* <div>
              <input
                type="text"
                value={post.name}
                name="name"
                onChange={changePost}
              />
              <input
                type="text"
                value={post.description}
                name="description"
                onChange={changePost}
              />
            </div> */}
            <div className="buttons">
              <button className="add" onClick={openModal}>
                New Task
              </button>
            </div>
            <div className="tasker">
              <div className="tasker_left">
                <div className="text">
                  <p className="text-1">Task</p>
                  <p className="text-2">important</p>
                </div>
                {lists}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
