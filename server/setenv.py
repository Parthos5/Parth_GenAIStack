import os
import yaml

# Read the YAML file
with open('config.yaml', 'r') as file:
    config = yaml.safe_load(file)

# Access the variable value
print(config['MAX_NUMBER_OF_AGENTS'])
