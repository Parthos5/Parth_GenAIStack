from sqlalchemy import Boolean,Column,ForeignKey,Integer,String
from database import Base

class Users(Base):
    __tablename__ = 'users'
    id=Column(Integer,primary_key=True,index=True)
    username=Column(String,index=True)
    email=Column(String,index=True)
    password=Column(String,index=True)
    # Add more columns as needed

class Stack(Base):
    __tablename__ = 'stack'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    name = Column(String, index=True)
    description = Column(String, index=True)
    agents = relationship("Agent", back_populates="stack")

class Agent(Base):
    __tablename__ = 'agent'
    id = Column(Integer, primary_key=True, index=True)
    agentName = Column(String, index=True)
    role = Column(String, index=True)
    goal = Column(String, index=True)
    backstory = Column(String, index=True)
    task = Column(String, index=True)
    capability = Column(String,index=True)
    # Define other columns as needed
    stack_id = Column(Integer, ForeignKey('stack.id'))
    stack = relationship("Stack", back_populates="agents")