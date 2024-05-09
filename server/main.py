import requests
from typing import Union,List,Annotated
from fastapi import FastAPI, HTTPException, Depends
import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session
import uvicorn
from pydantic import BaseModel

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

dp_dependency = Depends(get_db)

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
    role: str
    goal: str
    backstory: str
    task: str
    capability: str # Assuming capability can have multiple values
    stack_id: int
    
class AgentRead(BaseModel):
    id: int
    agentName: str
    role: str
    goal: str
    backstory: str
    task: str
    capability: str
    stack_id: int

    class Config:
        orm_mode = True
        
@app.get("/")
def read_root():
    return {"Hello": "World"}

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
        return {"message": "Login successful", "user_id": user.id}
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

@app.post("/createAgent/", response_model=AgentRead)
def create_agent(agent_data: AgentCreate, db: Session = Depends(get_db)):
    # Create a new Agent instance
    new_agent = models.Agent(
        agentName=agent_data.agentName,
        role=agent_data.role,
        goal=agent_data.goal,
        backstory=agent_data.backstory,
        task=agent_data.task,
        capability=agent_data.capability,  # Join capabilities into a single string
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

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
