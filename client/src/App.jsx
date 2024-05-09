import { useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import Edit from "./Pages/Edit/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
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
  },
  {
    path:"/edit/:stackId",
    element:<Edit />
  },
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
