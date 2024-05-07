import os
import yaml

# Read the YAML file
os.environ['OPENAGI_CONFIG_PATH'] = "C:/Users/thosp/OneDrive/Documents/GitHub/Parth_GenAIStack/server/config/config.yaml"

openagi_config_path = os.environ.get('OPENAGI_CONFIG_PATH')
with open(openagi_config_path, 'r') as file:
    config = yaml.safe_load(file)
print("OPENAGI_CONFIG_PATH:", openagi_config_path)
# Access the variable value
print(config['MAX_NUMBER_OF_AGENTS'])
