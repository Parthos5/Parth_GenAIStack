import React, { useState } from "react";
import "./CreateNewPopup.css";
import cross from "../../assets/cross.png";
import { useNavigate } from "react-router-dom";

export default function CreateNewPopup({ onCreate, onClick }) {
  const [stackname, setName] = useState("");
  const [description, setDescription] = useState("");
  const url = "http://127.0.0.1:8000";
  const navigate = useNavigate();

  const handleCreate = async () => {
    // e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }
    const requestBody = {
      name: stackname,
      description: description,
      user_id: parseInt(userId)
    };

    try {
      const response = await fetch(`${url}/createStack/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle the response data
      const data = await response.json();
      console.log("Stack created:", data);

      // Call the onCreate callback function to update the parent component
      onCreate(data);

      // Close the popup
      onClick();
      window.location.reload();
    } catch (error) {
      console.error("Error creating stack:", error);
      alert("Failed to create stack. Please try again.");
    }
    
  };

  return (
    <div className="createNewPopupOverlay">
      <div className="createNewPopupDiv">
        <div className="createNewPopupContent">
          <div className="createNewPopupHeader">
            <span>Create New Stack</span>
            <button className="createNewPopupClose" onClick={onClick}>
              <img src={cross} alt="" />
            </button>
          </div>
          <form
            className="createNewPopupForm"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="stackName">Name</label>
            <input
              id="stackName"
              value={stackname}
              onChange={(e) => setName(e.target.value)}
              placeholder="Chat With PDF"
            />
            <label htmlFor="stackDescription">Description</label>
            <textarea
              id="stackDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Chat with your pdf docs"
              style={{ height: "170px" }}
            />
            <div className="createNewPopupButtons">
              <button className="createNewPopupCancel" onClick={onClick}>
                Cancel
              </button>
              <button
                className={`createNewPopupCreate ${
                  stackname && description ? "createButtonWithText" : ""
                }`}
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
