import { useState } from "react";

let baseUrl = `https://miniprojectc.herokuapp.com/api/v1`;
let token = localStorage.getItem("token");
const [todos, setTodos] = useState([]);
const [post, setPost] = useState({
  name: "",
  description: ""
});

const changePost = e => {
  setPost({
    ...post,
    [e.target.name]: e.target.value
  });
};

export const getAllTodos = async () => {
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
    await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async id => {
  console.log("id", id);
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
    await getAllTodos();
  } catch (error) {
    console.log(error);
  }
};

export const postNewTodos = async () => {
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
