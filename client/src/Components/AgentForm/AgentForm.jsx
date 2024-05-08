import React from "react";
import "./AgentForm.css";
import agentsIcon from "../../assets/agentsIcon.png";

export default function AgentForm(props) {
  const {
    name,
    role,
    goal,
    backstory,
    capabilities,
    task,
    tools_list,
    onChange,
  } = props;

  return (
    <div className="agent-container">
      <div className="componentHead" style={{ marginBottom: "20px" }}>
        <img src={agentsIcon} alt="" />
        Agent - {name}
      </div>
      <div className="agent-form">
        <div className="agent-form-group">
          <label htmlFor="agentName">Agent Name</label>
          <input
            type="text"
            id="agentName"
            value={name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>
        <div className="agent-form-group">
          <label htmlFor="agentRole">Role</label>
          <input
            type="text"
            id="agentRole"
            value={role}
            onChange={(e) => onChange("role", e.target.value)}
          />
        </div>
        <div className="agent-form-group">
          <label htmlFor="agentGoal">Goal</label>
          <input
            type="text"
            id="agentGoal"
            value={goal}
            onChange={(e) => onChange("goal", e.target.value)}
          />
        </div>
        <div className="agent-form-group">
          <label htmlFor="agentBackstory">Backstory</label>
          <input
            type="text"
            id="agentBackstory"
            value={backstory}
            onChange={(e) => onChange("backstory", e.target.value)}
          />
        </div>
        <div className="agent-form-group">
          <label htmlFor="agentCapability">Capability</label>
          <select
            id="agentCapability"
            value={capabilities}
            onChange={(e) => onChange("capabilities", e.target.value)}
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
            value={task}
            onChange={(e) => onChange("task", e.target.value)}
          />
        </div>
        <div className="agent-form-group">
          <label htmlFor="agentTask">Tools</label>
          <input
            type="text"
            id="agentTools"
            value={tools_list}
            placeholder='["wikisearch","duckducksearch"]'
            onChange={(e) => onChange("tools_list", JSON.parse(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
