import React, { useMemo, useState } from "react";
import "./Edit.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import editIcon from "../../assets/editIcon.png";
import agentsIcon from "../../assets/agentsIcon.png";
import dropdownIcon from "../../assets/dropdownIcon.png";
import llmIcon from "../../assets/llmIcon.png";
import toolsIcon from "../../assets/toolsIcon.png";
import hamburgerIcon from "../../assets/hamburgerIcon.png";
import upArrowIcon from "../../assets/upArrowIcon.png";
import dndIcon from '../../assets/dndIcon.png'
import Navbar from "../../Components/Navbar/Navbar";
import AgentForm from "../../Components/AgentForm/AgentForm";

export default function Edit() {
  const [agents, setAgents] = useState([
    {
      agentName: "writer",
      role: "summarising expert",
      goal: "summarize input into presentable points",
      backstory: "Expert in summarising the given text",
      capabilities: "llm_task_executor",
      task: "summarize points to present to health care professionals",
      add: false,
      tools_list:["wikisearch"]
    },
    {
      agentName: "emailer",
      role: "communication facilitator",
      goal: "manage and organize email correspondence",
      backstory: "Experienced in handling email campaigns and communications",
      capabilities:"llm_task_executor",
      task: "organize emails into folders and send out scheduled emails",
      add: false,
      tools_list:[]
    },
  ]);
  const [tools, setTools] = useState([
    {
      name: "Wikisearch",
    },
    {
      name: "DuckDuckSearch",
    },
    {
      name: "GMail",
    },
    {
      name: "Github",
    },
  ]);
  const [llms, setLLMs] = useState([
    {
      name: "phi3",
    },
  ]);
  function handleAddAgent() {
    if (newAgentName.trim() !== "") {
      setAgents([...agents, { agenName: newAgentName }]);
      setNewAgentName(""); // Reset input field
    }
  }

  const [displayAgent, setDisplayAgent] = useState(false);
  const [displayTools, setDisplayTools] = useState(false);
  const [displayLLMs, setDisplayLLMs] = useState(false);
  const [newAgentName, setNewAgentName] = useState("");
  const [selectedModel,setSelectedModel] = useState(false)
  const ResponsiveGridLayout = WidthProvider(Responsive);

  const initialLayout = [
    { i: "agent1", x: 0, y: 0, w: 2, h: 3 },
    // Add more items to the layout as needed
  ];

  // Initialize the agents state with the newAgents array
  const [pgAgents, setPgAgents] = useState([]);

  function handleDisplay(prop) {
    if (prop === "agents") {
      setDisplayAgent(!displayAgent);
    } else if (prop === "tools") {
      setDisplayTools(!displayTools);
    } else if (prop === "llm") {
      console.log("llm");
      setDisplayLLMs(!displayLLMs);
    }
  }
  const onChangeAgent = (index, field, value) => {
    const updatedAgents = [...agents];
    updatedAgents[index][field] = value;
    setAgents(updatedAgents);

    console.log(agents)
    // const updatedPgAgents = [...pgAgents];
    // updatedPgAgents[index][field] = value;
    // setPgAgents(updatedPgAgents);
  };


  const Playground = useMemo(
    () => (
      <div className="playGround">
        {" "}
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: initialLayout }}
          breakpoints={{ lg: 1200 }}
          cols={{ lg: 12 }}
          rowHeight={1}
          width={1200}
          verticalCompact={false}
          isResizable={false}
          preventCollision={true}
        >
          {pgAgents.map((agent, index) => (
            <div
              key={agent.agentName}
              className="agent-container"
              data-grid={{ x: index * 2, y: 0, w: 2, h: 3 }}
            >
              {/* <h3>{agent.name}</h3> */}
              <AgentForm
                name={agent.agentName}
                role={agent.role}
                goal={agent.goal}
                backstory={agent.backstory}
                capabilities={agent.capabilities}
                task={agent.task}
                tools_list = {agent.tools_list}
                onChange={(field, value) => onChangeAgent(index, field, value)}
              />
              {/* ... other content ... */}
            </div>
          ))}
          {/* Render additional containers as needed */}
        </ResponsiveGridLayout>

        <div className="dndPlaceholder"><img src={dndIcon} alt="" /> <p>Drag and Drop to get started</p> </div>
      </div>
    ),
    [pgAgents]
  );

  function handleAgent(name, index) {
    if (!agents[index].add) {
      // Set the add attribute to true for the agent
      const updatedAgents = [...agents];
      updatedAgents[index] = { ...updatedAgents[index], add: true };
      setAgents(updatedAgents);
      // Append the name to pgAgents
      setPgAgents([...pgAgents, { agentName:name, add: true }]);
    } else {
      // Set the add attribute to false for the agent
      const updatedAgents = [...agents];
      updatedAgents[index] = { ...updatedAgents[index], add: false };
      setAgents(updatedAgents);
  
      // Remove the agent from pgAgents
      const filteredPgAgents = pgAgents.filter((agent) => agent.agentName !== name);
      setPgAgents(filteredPgAgents);
    }
  }

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
              <div
                className="componentTop"
                onClick={() => handleDisplay("agents")}
              >
                <div className="componentHead">
                  <img src={agentsIcon} alt="" />
                  Agents
                </div>
                <img
                  className={displayAgent ? "upArrowIcon" : "dropdownIcon"}
                  src={displayAgent ? upArrowIcon : dropdownIcon}
                  alt=""
                />
              </div>
              {displayAgent &&
                agents.map((agent, index) => (
                  <div key={index} className="componentOptions">
                    <div
                      className={
                        "Option" + (agent.add ? " greenBackground" : "")
                      }
                      onClick={() => handleAgent(agent.agentName, index)}
                    >
                      <p>{agent.agentName}</p>
                      <img
                        className="hamburgerIcon"
                        src={hamburgerIcon}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              <div className="componentOptions">
                <div className="Option newAgent">
                  <input
                    type="text"
                    placeholder="New Agent"
                    value={newAgentName}
                    className="newAgentInput"
                    onChange={(e) => setNewAgentName(e.target.value)}
                  />
                  <button onClick={handleAddAgent}>+</button>
                </div>
              </div>
            </div>
            <div className="componentDiv">
              <div
                className="componentTop"
                onClick={() => handleDisplay("tools")}
              >
                <div className="componentHead">
                  <img src={toolsIcon} alt="" />
                  Tools
                </div>
                <img
                  className={displayTools ? "upArrowIcon" : "dropdownIcon"}
                  src={displayTools ? upArrowIcon : dropdownIcon}
                  alt=""
                />
              </div>
              {displayTools &&
                tools.map((tool, index) => (
                  <div key={index} className="componentOptions">
                    <div className="Option">
                      <p>{tool.name}</p>
                      <img
                        className="hamburgerIcon"
                        src={hamburgerIcon}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
            </div>
            <div className="componentDiv">
              <div
                className="componentTop"
                onClick={() => handleDisplay("llm")}
              >
                <div className="componentHead">
                  <img src={llmIcon} alt="" />
                  LLMs
                </div>
                <img
                  className={displayLLMs ? "upArrowIcon" : "dropdownIcon"}
                  src={displayLLMs ? upArrowIcon : dropdownIcon}
                  alt=""
                />
              </div>
              {displayLLMs &&
                llms.map((llm, index) => (
                  <div key={index} className="componentOptions"  onClick={()=>setSelectedModel(!selectedModel)}>
                    <div className={
                        "Option" + (selectedModel? " greenBackground" : "")
                      } >
                      <p>{llm.name}</p>
                      <img
                        className="hamburgerIcon"
                        src={hamburgerIcon}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {Playground}
      </div>
    </div>
  );
}
