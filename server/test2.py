import os
os.environ['OPENAGI_CONFIG_PATH'] = "C:/Users/thosp/OneDrive/Documents/GitHub/Parth_GenAIStack/server/config/config.yaml"
import logging
from langchain_community.llms import Ollama
from openagi.agent import Agent as OpenAGIAgent
from openagi.init_agent import kickOffAgents
from openagi.llms.base import LLMBaseModel, LLMConfigModel
from openagi.utils.yamlParse import read_yaml_config
from openagi.tools.integrations import DuckDuckGoSearchTool
from typing import List
from models import Agent as webAgent

agent_list = []
mainResp = ""

class OllamaConfigModel(LLMConfigModel):
    """Configuration model for OLLAMA."""
    model_name: str

class OllamaModel(LLMBaseModel):
    """Ollama implementation of the LLMBaseModel."""
    def __init__(self, config: OllamaConfigModel):
        super().__init__(config)

    def load(self):
        """Initializes the Ollama instance with configurations."""
        ollama_model = "phi3"
        print(f">>> {ollama_model=}")
        self.llm = Ollama(model=ollama_model)
        return self.llm

    def run(self, input_text: str):
        """Runs the Ollama model with the provided input text.
        Args:
            input_text: The input text to process.
        Returns:
            The response from the Ollama model.
        """
        if not self.llm:
            self.load()
        print("ollma ...")
        resp = self.llm(input_text)
        print(f"ollma is working...{resp}")
        return resp

    @staticmethod
    def load_from_yaml_config():
        return OllamaConfigModel(model_name="phi3")

# Rest of the code remains the same
def onResultHGI(agentName, result, consumerAgent):
    feedback = "Pass"
    action = "None"
    mainResp = result
    logging.debug(f"{agentName}:TO:{consumerAgent}-> {result}")
    return result, feedback, action,mainResp

def run_agents(updated_pg_agents: List[webAgent]) -> str:
    global agent_list
    # Update the global agent_list with the updated_pg_agents
    agent_list = updated_pg_agents
    final_agents = []
    # Your logic to run the agents and generate a response
    config = OllamaModel.load_from_yaml_config()
    llm = OllamaModel(config=config)
    for web_agent in updated_pg_agents:
        agent = OpenAGIAgent(
            agentName=web_agent.agentName,
            role=web_agent.role,
            goal=web_agent.goal,
            backstory=web_agent.backstory,
            task=web_agent.task,
            capability=web_agent.capability,
            output_consumer_agent=web_agent.output_consumer_agent
            # Add other necessary attributes here
        )
        # agent.llm = llm  # Set the llm attribute to the loaded LLM model
        final_agents.append(agent)
    kickOffAgents(final_agents, [final_agents[0]], llm=llm)
    # For demonstration purposes, let's assume the response is a string
    # response = output
    
    # Return the response
    return mainResp

# Example Usage:
if __name__ == "__main__":
    
    example_agents = [
        Agent(
            agentName="WRITER",
            # ... (other attributes)
        ),
        Agent(
            agentName="EMAILER",
            # ... (other attributes)
        ),
    ]
    response = run_agents(example_agents)
    print(response)
