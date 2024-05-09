#!/bin/bash

curl -X POST "http://127.0.0.1:8000/signup/" \
-H "Content-Type: application/json" \
-d '{
    "username": "example_user",
    "email": "example@example.com",
    "password": "example_password"
}'
