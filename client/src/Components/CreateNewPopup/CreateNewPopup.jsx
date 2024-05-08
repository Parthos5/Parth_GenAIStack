import React, { useState } from "react";
import "./CreateNewPopup.css";
import cross from "../../assets/cross.png";

export default function CreateNewPopup({ onCreate, onClick }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    onCreate({ name, description });
    onClick();
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
              value={name}
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
                  name && description ? "createButtonWithText" : ""
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
