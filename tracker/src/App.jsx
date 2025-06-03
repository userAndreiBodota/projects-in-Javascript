import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Budget from "./components/Budget";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function App() {
  return (
    <>
      <div className="container ">
        <h1 className="text-center mt-12"> My budget Planner</h1>
        <Budget />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
