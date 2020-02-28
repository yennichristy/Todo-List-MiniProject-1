import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/DashBoard.scss";
import picts from "../../pictures/sunflower.jpeg";
import AddModal from "../Modals/AddModal";
import EditModal from "../Modals/EditModal";
import DatePicker from "react-date-picker";

const DashBoardPage = () => {
  let baseUrl = "https://miniprojectc.herokuapp.com/api/v1";
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [todos, setTodos] = useState([]);
  const [post, setPost] = useState({
    name: "",
    description: "",
    dueDate: ""
  });

  const [timDate, setTimdate] = useState(new Date());

  const dateChange = date => {
    setTimdate({ date });
  };

  const [dataId, setDataId] = useState(null);

  const changeDataid = e => {
    setDataId({
      ...dataId,
      [e.target.name]: e.target.value
    });
  };

  const changePost = e => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    });
  };

  // modal add ---------------------------------------------------------------------------------------------------------------------------------------------
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // modal edit -------------------------------------------------------------------------------------------------------------------------------------------

  const openEdit = () => {
    setModalEdit(true);
  };

  const closeEdit = () => {
    setModalEdit(false);
  };

  //Filter Important & Completed ----------------------------------------------------------------------------------------------------------------------------

  let filterIm = () => {
    setTodos(todos.filter(item => item.importance === true));
  };

  const filterCom = () => {
    setTodos(todos.filter(item => item.completion === true));
  };

  //Tasks New data -----------------------------------------------------------------------------------------------------------------------------------------

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

  function formatDate(date) {
    let dateOrder = new Date(date),
      month = "" + (dateOrder.getMonth() + 1),
      day = "" + dateOrder.getDate(),
      year = dateOrder.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  }

  const postNewTodos = async e => {
    e.preventDefault();
    let changeDate = formatDate(timDate.date);
    let token = localStorage.getItem("token");
    const newPost = {
      name: post.name,
      description: post.description,
      dueDate: changeDate
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
      const data = await postresponse.json();
      console.log("test", data);
      await getAllTodos();
      setPost("");
    } catch (error) {
      console.log(error);
    }
  };

  //Task Edit Data -------------------------------------------------------------------------------------------------------------------------------------------

  const getId = async id => {
    console.log("id", id);
    let token = localStorage.getItem("token");

    try {
      const getIdRes = await fetch(`${baseUrl}/tasks/id?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });
      const dataGetId = await getIdRes.json();
      setDataId(dataGetId.data);
      console.log("data", dataId);
      openEdit();
    } catch (error) {
      console.log(error);
    }
  };

  const postByid = async id => {
    let token = localStorage.getItem("token");
    const newTask = {
      id: id,
      name: dataId.name,
      description: dataId.description,
      dueDate: dataId.dueDate,
      completion: true,
      importance: true
    };

    console.log(newTask);
    try {
      let editRes = await fetch(`${baseUrl}/tasks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        },
        body: JSON.stringify(newTask)
      });
      await editRes.json();
      await getAllTodos();
      closeEdit();
    } catch (error) {
      console.log(error);
    }
  };

  //Task Delete -----------------------------------------------------------------------------------------------------------------------------------------------------

  const deleteTodo = async id => {
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

  const getUpdate = async id => {
    let token = localStorage.getItem("token");
    try {
      const imRes = await fetch(`${baseUrl}/tasks/id?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });
      let data = await imRes.json();
      setDataId(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Task Filter Completed -------------------------------------------------------------------------------------------------------------------------------------------

  const postCom = async id => {
    await getUpdate(id);
    let token = localStorage.getItem("token");
    const completed = {
      id: id,
      completion: true
    };
    try {
      const comRes = await fetch(`${baseUrl}/tasks/update/completion`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        },
        body: JSON.stringify(completed)
      });
      await comRes.json();
      await getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const delCom = async id => {
    await getUpdate(id);
    let token = localStorage.getItem("token");
    const completed = {
      id: id,
      completion: false
    };
    try {
      const comRes = await fetch(`${baseUrl}/tasks/update/completion`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        },
        body: JSON.stringify(completed)
      });
      await comRes.json();
      await getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };

  //Task Filter Important -------------------------------------------------------------------------------------------------------------------------------------------

  const postIm = async id => {
    await getUpdate(id);
    let token = localStorage.getItem("token");
    const important = {
      id: id,
      importance: true
    };
    try {
      let impRes = await fetch(`${baseUrl}/tasks/update/importance`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        },
        body: JSON.stringify(important)
      });
      await impRes.json();
      await getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };

  //Unimportant -----------------------------------------------------------------------------------------------------------------------------------------------
  const delImp = async id => {
    await getUpdate(id);
    let token = localStorage.getItem("token");
    const newTask = {
      id: id,
      importance: false
    };
    try {
      let postimpRes = await fetch(`${baseUrl}/tasks/update/importance`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        },
        body: JSON.stringify(newTask)
      });

      await postimpRes.json();
      console.log("change to false");
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
        value={false}
        onChange={
          item.completion ? () => delCom(item.id) : () => postCom(item.id)
        }
      />
      <p className="title">{item.name}</p>
      <div className="icons">
        <div className="star">
          <i
            className="fa far fa-star"
            style={{ color: item.importance ? "#4c9188" : "black" }}
            onClick={
              item.importance ? () => delImp(item._id) : () => postIm(item._id)
            }
          ></i>
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
        {/* {false ? "mucul" : "gak muncul"} */}
      </div>
    </div>
  ));

  useEffect(() => {
    getAllTodos();
  });

  return (
    <div className="dashbigcon">
      {/* ini add modal ----------------------------------------------------------------------------------------------------------------------------------- */}
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
                  <DatePicker
                    selected={timDate.toString()}
                    onChange={dateChange}
                    value={post.dueDate}
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

      {/* ini edit modal ----------------------------------------------------------------------------------------------------------------------------------- */}
      <EditModal edit={modalEdit}>
        <div className="bigcon">
          <div>
            <div className="newcon">
              <div>
                <div className="taskform">
                  <p className="taskform--title">Title:</p>
                  <input
                    className="areas"
                    type="text"
                    name="name"
                    value={dataId && dataId.name}
                    onChange={changeDataid}
                  />
                  <p className="titlearea">Description:</p>
                  <input
                    className="descarea"
                    type="text"
                    name="description"
                    value={dataId && dataId.description}
                    onChange={changeDataid}
                  />
                  <p className="taskform--title">Due date:</p>
                  <input
                    className="areadate"
                    type="date"
                    dateFormat="dd/mm/yyyy"
                    name="dueDate"
                    value={dataId && dataId.dueDate}
                    onChange={changeDataid}
                  />
                  {/* <DatePicker
                    name="dueDate"
                    value={dataId && dataId.dueDate}
                    selected={timDate.toString()}
                    onChange={dateChange}
                  /> */}
                  <div className="submit">
                    <button className="submitbtn" onClick={closeEdit}>
                      Cancel
                    </button>
                    <button
                      className="submitbtn"
                      onClick={() => postByid(dataId && dataId._id)}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EditModal>
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
              <button className="menubtn" onClick={getAllTodos}>
                My days
              </button>
              <button className="menubtn" onClick={filterIm}>
                Important
              </button>
              <button className="menubtn" onClick={filterCom}>
                Completed
              </button>
            </div>
          </div>
          <div className="dashbottom_right">
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
