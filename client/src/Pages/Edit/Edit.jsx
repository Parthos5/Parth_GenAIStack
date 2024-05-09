import React, { useEffect, useMemo, useState } from "react";
import "./Edit.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-toward.css";
import "react-grid-layout/css/styles.css";
import editIcon from "../../assets/editIcon.png";
import agentsIcon from "../../assets/agentsIcon.png";
import dropdownIcon from "../../assets/dropdownIcon.png";
import llmIcon from "../../assets/llmIcon.png";
import toolsIcon from "../../assets/toolsIcon.png";
import hamburgerIcon from "../../assets/hamburgerIcon.png";
import upArrowIcon from "../../assets/upArrowIcon.png";
import dndIcon from "../../assets/dndIcon.png";
import buildIcon from "../../assets/buildIcon.png";
import runIcon from "../../assets/runIcon.png";
import Navbar from "../../Components/Navbar/Navbar";
import AgentForm from "../../Components/AgentForm/AgentForm";
import { useNavigate, useParams } from "react-router-dom";
import ChatPopup from "../../Components/ChatPopup/ChatPopup";

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
      tools_list: ["wikisearch"],
    },
    {
      agentName: "emailer",
      role: "communication facilitator",
      goal: "manage and organize email correspondence",
      backstory: "Experienced in handling email campaigns and communications",
      capabilities: "llm_task_executor",
      task: "organize emails into folders and send out scheduled emails",
      add: false,
      tools_list: [],
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
  const [displayAgent, setDisplayAgent] = useState(false);
  const [displayTools, setDisplayTools] = useState(false);
  const [displayLLMs, setDisplayLLMs] = useState(false);
  const [newAgentName, setNewAgentName] = useState("");
  const [selectedModel, setSelectedModel] = useState(false);
  const [readyToRun, setReadyToRun] = useState(false);
  const [modelName, setModelName] = useState("phi3");
  const [finalBuild, setFinalBuild] = useState({});
  const [stackName, setStackName] = useState("");
  const [displayChat,setDisplayChat] = useState(false)
  const { stackId } = useParams();
  const url = "http://127.0.0.1:8000";
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const navigate = useNavigate();

  const initialLayout = [{ i: "agent1", x: 0, y: 0, w: 2, h: 3 }];

  useEffect(() => {
    // Function to fetch stack data from the backend
    const fetchStack = async () => {
      try {
        const response = await fetch(`${url}/getOneStack/${stackId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setStackName(data.name);

        const agentsResponse = await fetch(`${url}/getAgents/${stackId}`);
        if (!agentsResponse.ok) {
          throw new Error("Network response was not ok for fetching agents");
        }
        const agentsData = await agentsResponse.json();
        console.log(agentsData);
        setAgents(agentsData);
      } catch (error) {
        console.error("Error fetching stack data:", error);
      }
    };

    if (stackId) {
      console.log(stackId);
      fetchStack();
    }
  }, []);
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
        alert("Please Login to access your account");
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

  function handleAddAgent() {
    if (newAgentName.trim() !== "") {
      setAgents([...agents, { agentName: newAgentName }]);
      setNewAgentName("");
    }
  }

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
    setPgAgents(updatedAgents);
    console.log(index);
    console.log(field);
    console.log(value);
    console.log(agents);
  };

  const handleBuild = async () => {
    const data = {
      pgAgents: pgAgents,
      modelName: modelName,
    };

    try {
      const response = await fetch(`${url}/build/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Build successful:", result);
      setFinalBuild(result);
      setReadyToRun(true)
      const runIconDiv = document.querySelector(".runIcon");
      runIconDiv.classList.add("opacity1");
      runIconDiv.classList.remove("opacity05");
    } catch (error) {
      console.error("Error during build process:", error);
    }
  };

  const uploadAgent = async (agentName) => {
    const agentToUpload = agents.find((agent) => agent.agentName == agentName);
    if (!agentToUpload) {
      console.error("Agent not found");
      return;
    }
    console.log(agentToUpload);

    const agentData = {
      ...agentToUpload,
      stack_id: stackId,
    };

    try {
      const response = await fetch(`${url}/createAgent/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Agent uploaded:", data);
    } catch (error) {
      console.error("Error uploading agent:", error);
    }
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
              key={index}
              className="agent-container"
              data-grid={{ x: index * 2, y: 0, w: 2, h: 3 }}
            >
              {/* <h3>{agent.name}</h3> */}
              <AgentForm
                agentName={agent.agentName}
                role={agent.role}
                goal={agent.goal}
                backstory={agent.backstory}
                capabilities={agent.capabilities}
                task={agent.task}
                tools_list={agent.tools_list}
                uploadAgent={uploadAgent}
                onChange={(field, value) => onChangeAgent(index, field, value)}
              />
            </div>
          ))}
        </ResponsiveGridLayout>
        {pgAgents.length == 0 && (
          <div className="dndPlaceholder">
            <img src={dndIcon} alt="" /> <p>Drag and Drop to get started</p>{" "}
          </div>
        )}
        <div className="buildRunDiv">
          <Tippy content="Build" placement="left" animation="fade">
            <div className="actionIconDiv buildIcon" onClick={handleBuild}>
              <img src={buildIcon} className="actionIcon" alt="Build" />
            </div>
          </Tippy>
          <Tippy content="Run" placement="left" animation="fade">
            <div
              className="actionIconDiv runIcon opacity05"
              onClick={()=>setDisplayChat(!displayAgent)}
            >
              <img src={runIcon} className="actionIcon" alt="Run" />
            </div>
          </Tippy>
        </div>
      </div>
    ),
    [pgAgents]
  );

  function handleAgent(name, index) {
    if (!agents[index].add) {
      const updatedAgents = [...agents];
      updatedAgents[index] = { ...updatedAgents[index], add: true };
      setAgents(updatedAgents);
      setPgAgents([
        ...pgAgents,
        {
          agentName: name,
          role: "",
          goal: "",
          backstory: "",
          capability: "",
          task: "",
          tools_list: [],
          add: true,
        },
      ]);
    } else {
      const updatedAgents = [...agents];
      updatedAgents[index] = { ...updatedAgents[index], add: false };
      setAgents(updatedAgents);

      const filteredPgAgents = pgAgents.filter(
        (agent) => agent.agentName !== name
      );
      setPgAgents(filteredPgAgents);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="editContainer">
        <div className="sideBar">
          <div className="stackName">
            {stackName} <img src={editIcon} className="editIcon" alt="" />
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
                  <div
                    key={index}
                    className="componentOptions"
                    onClick={() => setSelectedModel(!selectedModel)}
                  >
                    <div
                      className={
                        "Option" + (selectedModel ? " greenBackground" : "")
                      }
                    >
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
      {displayChat && <ChatPopup />}
    </div>
  );
}
