import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SignUpPage from "../src/components/Pages/SignUpPage";
import SignInPage from "../src/components/Pages/SignInPage";
import DashBoardPage from "../src/components/Pages/DashBoardPage";
import NewTask from "./components/NewTask";

const App = () => {
  // const token = localStorage.token;

  return (
    <BrowserRouter>
      <Route path="/" exact>
        <SignInPage />
      </Route>
      <Route path="/register" exact>
        <SignUpPage />
      </Route>
      <Route path="/dashboard" exact>
        <DashBoardPage />
      </Route>
      <Route path="/newtask" exact>
        <NewTask />
      </Route>
    </BrowserRouter>
  );
};

export default App;
