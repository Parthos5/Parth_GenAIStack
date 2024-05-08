import React from "react";
import "./Edit.css";
import editIcon from "../../assets/editIcon.png";
import agentsIcon from "../../assets/agentsIcon.png";
import dropdownIcon from "../../assets/dropdownIcon.png";
import llmIcon from "../../assets/llmIcon.png";
import toolsIcon from "../../assets/toolsIcon.png";
import Navbar from "../../Components/Navbar/Navbar";

export default function Edit() {
  return (
    <div>
      <Navbar />
      <div className="editContainer">
        <div className="sideBar">
          <div className="stackName">
            Chat with pdf <img src={editIcon} className="editIcon" alt="" />
          </div>
          <div className="stackComponents">
            <div className="componentDiv">
              <div className="componentHead">
                <img src={agentsIcon} alt="" />
                Agents
              </div>
              <img className="dropdownIcon" src={dropdownIcon} alt="" />
            </div>
            <div className="componentDiv">
              <div className="componentHead">
                <img src={toolsIcon} alt="" />
                Tools
              </div>
              <img className="dropdownIcon" src={dropdownIcon} alt="" />
            </div>
            <div className="componentDiv">
              <div className="componentHead">
                <img src={llmIcon} alt="" />
                LLMs
              </div>
              <img className="dropdownIcon" src={dropdownIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="playGround">hello</div>
      </div>
    </div>
  );
}
