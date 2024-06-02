import React, { useState } from "react";
import "./AgentForm.css";
import agentsIcon from "../../assets/agentsIcon.png";
import { useParams } from "react-router-dom";
import { Handle, Position } from "reactflow";

export default function AgentForm(props) {
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
  const [localAgentName, setLocalAgentName] = useState(agentName);
  const [localRole, setLocalRole] = useState(role);
  const [localGoal, setLocalGoal] = useState(goal);
  const [localBackstory, setLocalBackstory] = useState(backstory);
  const [localCapabilities, setLocalCapabilities] = useState(capabilities);
  const [localTask, setLocalTask] = useState(task);
  const [localToolsList, setLocalToolsList] = useState(tools_list);
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
          Agent - {localAgentName}
        </div>
        <div className="agent-form">
          <div className="agent-form-group">
            <label htmlFor="agentName">Agent Name</label>
            <input
              type="text"
              id="agentName"
              value={localAgentName}
              onChange={handleInputChange(setLocalAgentName)}
              onKeyDown={(e) => handleKeyDown(e, "agentName", localAgentName)}
            />
          </div>
          <div className="agent-form-group">
          <label htmlFor="agentRole">Role</label>
          <input
            type="text"
            id="agentRole"
            value={localRole}
            onChange={handleInputChange(setLocalRole)}
            onKeyDown={(e) => handleKeyDown(e, "role", localRole)}
          />
        </div>
        <div className="agent-form-group">
          <label htmlFor="agentGoal">Goal</label>
          <input
            type="text"
            id="agentGoal"
            value={localGoal}
            onChange={handleInputChange(setLocalGoal)}
            onKeyDown={(e) => handleKeyDown(e, "goal", localGoal)}
          />
        </div>
        <div className="agent-form-group">
          <label htmlFor="agentBackstory">Backstory</label>
          <input
            type="text"
            id="agentBackstory"
            value={localBackstory}
            onChange={handleInputChange(setLocalBackstory)}
            onKeyDown={(e) => handleKeyDown(e, "backstory", localBackstory)}
          />
        </div>
        <div className="agent-form-group">
          <label htmlFor="agentCapability">Capability</label>
          <select
            id="agentCapability"
            value={localCapabilities}
            onChange={handleInputChange(setLocalCapabilities)}
            onKeyDown={(e) => handleKeyDown(e, "capability", localCapabilities)}
          >
            <option value="search_executor">Search Executor</option>
            <option value="llm_task_executor">LLM Task Executor</option>
          </select>
        </div>
        <div className="agent-form-group">
          <label htmlFor="agentTask">Task</label>
          <input
            type="text"
            id="agentTask"
            value={localTask}
            onChange={handleInputChange(setLocalTask)}
            onKeyDown={(e) => handleKeyDown(e, "task", localTask)}
          />
        </div>
        <div className="agent-form-group">
          <label htmlFor="agentTools">Tools</label>
          <input
            type="text"
            id="agentTools"
            value={localToolsList}
            onChange={handleInputChange(setLocalToolsList)}
            onKeyDown={(e) => handleKeyDown(e, "tools_list", localToolsList)}
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
