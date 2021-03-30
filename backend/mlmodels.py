# %%
import numpy as np
from sklearn.datasets import load_digits
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

import matplotlib.pyplot as plt
import pickle

x,y = load_digits(return_X_y = True)

model = KNeighborsClassifier()
x = (x-x.mean())/x.std()
# model = make_pipeline(StandardScaler(), KNeighborsClassifier())

x_train, x_test, y_train, y_test = train_test_split(x,y,test_size=0.1)
model.fit(x_train,y_train)
print(model.score(x_test,y_test))

fig, ax = plt.subplots(nrows=4, ncols=4, figsize=(8,8))
for i, axi in enumerate(ax.flat):
    rand = np.random.randint(len(x_test))
    pred = model.predict(x_test[rand].reshape(1, -1))
    
    axi.imshow(x_test[rand].reshape((8,8)), cmap='gray')
    axi.set_title(pred)

plt.show()

# %%
outfile = open('knn_model.pkl', 'wb')
saved =  pickle.dump(model, outfile)
outfile.close()