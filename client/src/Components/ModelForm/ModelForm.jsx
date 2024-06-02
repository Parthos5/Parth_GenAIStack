import React, { useState } from "react";
import "./AgentForm.css";
import agentsIcon from "../../assets/agentsIcon.png";
import { useParams } from "react-router-dom";
import { Handle, Position } from "reactflow";

export default function ModelForm(props) {
  const {
    agentName,
    role,
    goal,
    backstory,
    capabilities,
    task,
    tools_list,
    onChange,
    uploadAgent,
  } = props;
  const { stackId } = useParams();

  // Local state for each input field
  const [localMaxTokens, setMaxTokens] = useState(agentName);
  const [localTemperature, setLocalTemperature] = useState(role);
  const [localVersion, setLocalVersion] = useState(goal);
//   const [localBackstory, setLocalBackstory] = useState(backstory);
//   const [localCapabilities, setLocalCapabilities] = useState(capabilities);
//   const [localTask, setLocalTask] = useState(task);
//   const [localToolsList, setLocalToolsList] = useState(tools_list);
  const handleStyle = { left: 10 };

  // Function to handle key down events
  const handleKeyDown = (e, field, value) => {
    if (e.key === "Enter") {
      onChange(field, value);
    }
  };

  // Function to handle input changes and update local state
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="agent-container">
        <div className="componentHead" style={{ marginBottom: "20px" }}>
          <img src={agentsIcon} alt="" />
          Model Name - Phi3 {localAgentName}
        </div>
        <div className="agent-form">
          <div className="agent-form-group">
            <label htmlFor="agentName">Max Tokens</label>
            <input
              type="text"
              id="agentName"
              value={localMaxTokens}
              onChange={handleInputChange(setMaxTokens)}
              onKeyDown={(e) => handleKeyDown(e, "agentName", localMaxTokens)}
            />
          </div>
          <div className="agent-form-group">
          <label htmlFor="agentRole">Temperature</label>
          <input
            type="text"
            id="agentRole"
            value={localTemperature}
            onChange={handleInputChange(setLocalTemperature)}
            onKeyDown={(e) => handleKeyDown(e, "role", localTemperature)}
          />
        </div>
        <div className="agent-form-group">
          <label htmlFor="agentGoal">Version</label>
          <input
            type="text"
            id="agentGoal"
            value={localVersion}
            onChange={handleInputChange(setLocalVersion)}
            onKeyDown={(e) => handleKeyDown(e, "goal", localVersion)}
          />
        </div>
        <button
          style={{
            border: "1px solid grey",
            textAlign: "center",
            width: "50%",
            fontSize: "12px",
          }}
          onClick={() => uploadAgent(localAgentName)}
        >
          Save
        </button>
        </div>
        <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
      </div>
    </>
  );
}
