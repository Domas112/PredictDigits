from fastapi import FastAPI, Request
import json
import numpy as np
from keras.models import load_model
from keras.preprocessing.image import smart_resize, array_to_img
from fastapi.middleware.cors import CORSMiddleware
from math import sqrt
import matplotlib.pyplot as plt

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
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
    #Get response
    req = await request.json()
    #Get values of the response and turn it into a numpy array
    digit = np.array(list(req['digit'].values()))
    #Reshape 
    digit = digit.reshape(round(sqrt(len(digit))), round(sqrt(len(digit))) ,1)
    #Resize
    digit = smart_resize(digit,size=(28,28))
    #Predict
    answer = dl.predict(digit.reshape(1,28,28,1))

    print(answer.round(3))
    return answer.tolist()
    

@app.post('/test/')
async def test(request: Request):
    req = await request.json()
    digit = np.array(list(req['digit'].values()))
    digit = digit.reshape(400,400,1)
    digit = smart_resize(digit,size=(28,28))

    # plt.figure()
    # plt.imshow(digit)
    # plt.show()

    answer = dl.predict(digit.reshape(1,28,28,1))

    print(answer)
    return answer.round(2).tolist()
    