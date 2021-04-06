from fastapi import FastAPI, Request
import pickle
import json
import numpy as np
from keras.models import load_model
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5050",
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

dl = load_model('mymodel')

@app.post('/')
async def dlmodel(request: Request):
    req = await request.json()
    numreq = np.array(req['digit'])
    print(numreq.shape)
    print(numreq.reshape(1,28,28,1).shape)
    answer = dl.predict(numreq.reshape(1,28,28,1))

    print(answer)
    return answer.round(2).tolist()
    