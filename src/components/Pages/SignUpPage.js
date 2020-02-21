import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "../../styles/SignUpPage.scss";

const SignUpPage = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });

  let history = useHistory();

  const change = e => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value
    });
  };

  const submitRegister = async e => {
    e.preventDefault();
    const newUser = {
      name: register.name,
      email: register.email,
      password: register.password
    };

    console.log(newUser);
    try {
      const response = await fetch(
        `https://miniprojectc.herokuapp.com/api/v1/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newUser)
        }
      );
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.data.token);
      if (data.status) {
        history.push("/dashboard");
      }
      console.log(data);
      setRegister("");
    } catch (error) {
      console.log(error.errors);
      localStorage.removeItem("token");
    }
  };

  return (
    <div className="bigcontainer">
      <div className="container">
        <div className="containerleft">
          <h6>Todos</h6>
          <div className="leftcontent">
            <h3>Welcome Back!</h3>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <Link to="/">
              <button className="btnsign">SIGN IN</button>
            </Link>
          </div>
        </div>
        <div className="containerright">
          <div className="rightcontent">
            <h2>Create Account</h2>
            <div className="containersosmed">
              <div className="sosmed">
                <p className="sosmed--f">f</p>
                <p className="sosmed--g">G+</p>
                <p className="sosmed--in">in</p>
              </div>
            </div>
            <p>or use your email for regsitration</p>
            <form className="data" onSubmit={submitRegister}>
              <input
                className="data--name"
                type="text"
                name="name"
                value={register.name}
                placeholder="Your name here"
                onChange={change}
              />
              <input
                className="data--email"
                type="email"
                name="email"
                value={register.email}
                placeholder="Your email here"
                onChange={change}
              />
              <input
                className="data--pass"
                type="password"
                name="password"
                value={register.password}
                placeholder="Your password"
                onChange={change}
              />
              <input
                className="data--pass"
                type="password"
                name="confirm"
                value={register.confirm}
                placeholder="Retype your password"
                onChange={change}
              />
              <div>
                <button className="signup">SIGN UP</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
