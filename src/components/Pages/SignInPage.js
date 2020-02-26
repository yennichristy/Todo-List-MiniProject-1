import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "../../styles/SignInPage.scss";

const SignInPage = () => {
  const [logIn, setLogIn] = useState({
    email: "",
    password: ""
  });

  const change = e => {
    setLogIn({
      ...logIn,
      [e.target.name]: e.target.value
    });
  };

  let history = useHistory();

  const submitLogIn = async e => {
    e.preventDefault();
    const loginUser = {
      email: logIn.email,
      password: logIn.password
    };
    try {
      const response = await fetch(
        "https://miniprojectc.herokuapp.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(loginUser)
        }
      );
      const data = await response.json();
      console.log("token", data);
      if (data.data) {
        localStorage.setItem("token", data.data);
        history.push("/dashboard");
      } else if (!data.data) {
        console.log("token not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="inbigcontainer">
      <div className="incontainer">
        <div className="incontainerleft">
          <h6>Todos</h6>
          <div className="inleftcontent">
            <h3>Hello, Friend!</h3>
            <p>Enter your personal details and start your journey with us</p>
            <Link to="/register">
              <button className="btnsign">SIGN UP</button>
            </Link>
          </div>
        </div>
        <div className="incontainerright">
          <div className="inrightcontent">
            <h2>Sign in to Task Manager</h2>
            <div className="incontainersosmed">
              <div className="insosmed">
                <p className="insosmed--f">f</p>
                <p className="insosmed--g">G+</p>
                <p className="insosmed--in">in</p>
              </div>
            </div>
            <p>use your email account</p>
            <div className="indata">
              <form onSubmit={submitLogIn}>
                <input
                  className="indata--email"
                  type="text"
                  name="email"
                  value={logIn.email}
                  placeholder="Enter your email"
                  onChange={change}
                ></input>
                <input
                  className="indata--pass"
                  type="password"
                  name="password"
                  value={logIn.password}
                  placeholder="Enter you password"
                  onChange={change}
                ></input>
                <div>
                  <button className="signin">SIGN IN</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
