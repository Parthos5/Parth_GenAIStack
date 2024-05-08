from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

URL_DATABASE = "postgresql://postgres:test1234!@localhost:5432/GenAiStack"

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False,autoFlush=False,bind=engine)

Base = declarative_base