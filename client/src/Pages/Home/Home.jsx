import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import AddStackBtn from "../../Components/AddStackBtn/AddStackBtn";
import StackCard from "../../Components/StackCard/StackCard";
import CreateNew from "../../Components/CreateNew/CreateNew";
import CreateNewPopup from "../../Components/CreateNewPopup/CreateNewPopup";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [stacks, setStacks] = useState([
    {
      name: "Chat with PDF",
      description: "Chat with your pdf docs",
      id: "12345",
    },
    {
      name: "Chat with PDF",
      description: "Chat with your pdf docs",
      id: "123456",
    },
  ]);
  const [newStack, setNewStack] = useState(false);
  const url = "http://127.0.0.1:8000";
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async (token) => {
      try {
        const response = await fetch("http://127.0.0.1:8000/verifyToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Token verification failed");
        }
      } catch (error) {
        alert("Please Login to access your account")
        navigate("/login");
      }
    };

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token);
    } else {
      // If no token is found, redirect to the login page
      navigate("/login");
    }
  }, [navigate]);

  function handlePopup() {
    console.log("hello");
    setNewStack(!newStack);
  }

  return (
    <div className="homeDiv">
      {/* Home Section 1 */}
      <Navbar />

      {/* Home Section 2 */}
      <div className="hsect2 MyStacksSection">
        <p className="hsecthead" onClick={handlePopup}>
          My Stacks
        </p>
        {/* <button className="addStackBtn">Add stack</button> */}
        <AddStackBtn onClick={handlePopup} />
      </div>

      {/* Home Section 3 */}
      <div className="hsect3 DisplayStackSect">
        {stacks &&
          stacks.map((stack) => (
            <StackCard
              key={stack.id}
              name={stack.name}
              description={stack.description}
              cardId={stack.id}
            />
          ))}
      </div>

      {/* Empty Stack list case */}
      {stacks.length == 0 && <CreateNew onClick={handlePopup} />}

      {/* Create new stack form popup */}
      {newStack && <CreateNewPopup onClick={handlePopup} />}
    </div>
  );
}
