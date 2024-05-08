import React from "react";
import "./CreateNew.css";
import AddStackBtn from "../AddStackBtn/AddStackBtn";

export default function CreateNew({ onClick }) {
  return (
    <div className="createNewStack">
      <div className="newStackText">
        <div className="newStackHead">Create New Stack</div>
        <div className="newStackDesc">
          Start building your generative AI apps with our essential tools and
          frameworks
        </div>
      </div>
      <AddStackBtn onClick={onClick}/>
    </div>
  );
}
