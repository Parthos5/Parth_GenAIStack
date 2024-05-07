import { useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
  Link,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path:"/register",
    element:<Register />
  },
  {
    path:"/home",
    element:<Home />
  }
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
