import requests
from typing import Union,List,Annotated
from fastapi import FastAPI, HTTPException, Depends
import models
from database import engine,SessionLocal
from sqlalchemy.orm import session
import uvicorn

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

dp_dependency = Annotated(Session,Depends(get_db))
        
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/signup/")
def signup_user(username: str, email: str, password: str, db: Session = dp_dependency):
    user = models.Users(username=username, email=email, password=password)
    db.add(user)
    db.commit()
    return {"message": "User signed up successfully","user":user}

@app.post("/login/")
def login_user(email: str, password: str, db: Session = dp_dependency):
    user = db.query(models.Users).filter(models.Users.email == email, models.Users.password == password).first()
    if user:
        return {"message": "Login successful", "user_id": user.id}
    else:
        raise HTTPException(status_code=404, detail="User not found")

@app.get("/stacks/{user_id}")
def get_stacks(user_id: int, db: Session = dp_dependency):
    user = db.query(models.Users).filter(models.Users.id == user_id).first()
    if user:
        stacks = db.query(models.Stack).filter(models.Stack.user_id == user_id).all()
        return {"stacks": stacks}
    else:
        raise HTTPException(status_code=404, detail="User not found")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
