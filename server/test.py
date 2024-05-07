import requests
import time

API_URL = "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-128k-instruct"
huggingface_token = "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"

headers = {"Authorization": f"Bearer {huggingface_token}"}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

def is_model_ready():
    response = requests.get(API_URL)
    return response.status_code == 200

def get_output(payload):
    while True:
        if is_model_ready():
            return query(payload)
        else:
            print("Model is still loading. Retrying in 5 seconds...")
            time.sleep(5)

output = get_output({
    "inputs": "Can you please let us know more details about you",
})
print(output)
