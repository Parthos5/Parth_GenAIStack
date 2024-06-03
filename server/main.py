import requests
from typing import Union,List,Annotated,Optional
from fastapi import FastAPI, HTTPException, Depends,Security
from fastapi.security import OAuth2PasswordBearer
import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session
import uvicorn
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import jwt
from datetime import datetime, timedelta

SECRET_KEY = "thisismysecretkey"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

app = FastAPI()
models.Base.metadata.create_all(bind=engine)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for now because of assignment time constraints
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

dp_dependency = Depends(get_db)

class TokenData(BaseModel):
    user_id: int | None = None
    
class UserSignup(BaseModel):
    username: str
    email: str
    password: str
    
class UserLogin(BaseModel):
    email: str
    password: str
class StackCreate(BaseModel):
    name: str
    description: str
    user_id: int  
    
class StackModel(BaseModel):
    id: int
    name: str
    description: str
    user_id: int

    class Config:
        orm_mode = True
    
class AgentCreate(BaseModel):
    agentName: str
    role: Optional[str] = None
    goal: Optional[str] = None
    backstory: Optional[str] = None
    task: Optional[str] = None
    capability: Optional[str] = None
    stack_id: int
    
class AgentRead(BaseModel):
    id: int
    agentName: str
    role: Optional[str] = None
    goal: Optional[str] = None
    backstory: Optional[str] = None
    task: Optional[str] = None
    capability: Optional[str] = None
    stack_id: int

    class Config:
        orm_mode = True

class Agent(BaseModel):
    agentName: str
    role: str
    goal: str
    backstory: str
    capability: str
    task: str
    output_consumer_agent: List[str] = []
# class PgAgent(BaseModel):
#     agentName: str
#     role: str
#     goal: str
#     backstory: str
#     capability: str
#     task: str
#     tools_list: List[str]
#     add: bool

class BuildData(BaseModel):
    pgAgents: List[Agent]
    modelName: str
        
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/verifyToken")
def verify_token(token: str = Security(oauth2_scheme)):
    try:
        # Decode the received token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=400, detail="Invalid token payload")
        # Token is valid, return the user ID (or other user data if needed)
        return {"user_id": user_id}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/signup/")
def signup_user(user_data: UserSignup, db: Session = dp_dependency):
    user = models.Users(username=user_data.username, email=user_data.email, password=user_data.password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User signed up successfully", "user": user}

@app.post("/login/")
def login_user(login_data: UserLogin, db: Session = dp_dependency):
    user = db.query(models.Users).filter(models.Users.email == login_data.email, models.Users.password == login_data.password).first()
    if user:

        expiration_time = datetime.utcnow() + timedelta(days=1)
        
        token_payload = {
            "user_id": user.id,
            "exp": expiration_time
        }
        
        token = jwt.encode(token_payload, SECRET_KEY, algorithm=ALGORITHM)
        return {"message": "Login successful", "user_id": user.id, "token": token}
    else:
        raise HTTPException(status_code=404, detail="User not found")

@app.post("/createStack/", response_model=StackModel)
def create_stack(stack_data: StackCreate, db: Session = Depends(get_db)):
    try:
        new_stack = models.Stack(
            name=stack_data.name,
            description=stack_data.description,
            user_id=stack_data.user_id
        )
        db.add(new_stack)
        db.commit()
        db.refresh(new_stack)
        return new_stack
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/getStacks/{user_id}")
def get_stacks(user_id: int, db: Session = Depends(get_db)):
    stacks = db.query(models.Stack).filter(models.Stack.user_id == user_id).all()
    return {"stacks": stacks}

@app.get("/getOneStack/{stack_id}", response_model=StackModel)
def get_stack(stack_id: int, db: Session = Depends(get_db)):
    stack = db.query(models.Stack).filter(models.Stack.id == stack_id).first()
    if not stack:
        raise HTTPException(status_code=404, detail="Stack not found")
    return stack

@app.post("/createAgent/", response_model=AgentRead)
def create_agent(agent_data: AgentCreate, db: Session = Depends(get_db)):
    new_agent = models.Agent(
        agentName=agent_data.agentName,
        role=agent_data.role,
        goal=agent_data.goal,
        backstory=agent_data.backstory,
        task=agent_data.task,
        capability=agent_data.capability, 
        stack_id=agent_data.stack_id
    )
    db.add(new_agent)
    db.commit()
    db.refresh(new_agent)
    return new_agent

@app.get("/getAgents/{stack_id}", response_model=List[AgentRead])
def get_agents_by_stack_id(stack_id: int, db: Session = Depends(get_db)):
    agents = db.query(models.Agent).filter(models.Agent.stack_id == stack_id).all()
    return agents

def generate_pg_agents(pg_agents: List[Agent]) -> List[Agent]:
    updated_agents = []
    for i, agent in enumerate(pg_agents):
        if i < len(pg_agents) - 1:
            agent.output_consumer_agent = [pg_agents[i + 1].agentName]
        else:
            agent.output_consumer_agent = ["HGI"]
        updated_agents.append(agent)
    return updated_agents

@app.post("/build/")
def build_agents(build_data: BuildData, db: Session = Depends(get_db)):
    updated_pg_agents = generate_pg_agents(build_data.pgAgents)
    print(updated_pg_agents)
    print(build_data.modelName)
    global stored_updated_pg_agents
    stored_updated_pg_agents = updated_pg_agents
    return {"message": "Received build data","updated_pg_agents": updated_pg_agents}

@app.get("/run/")
def run_agents_endpoint():
    # Call the function in test2.py and pass the stored_updated_pg_agents
    from test2 import run_agents
    response_from_test2 = run_agents(stored_updated_pg_agents)
    # Return the response from test2.py
    return {"response_from_test2": response_from_test2}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
