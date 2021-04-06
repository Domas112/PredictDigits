#%%
import keras
from keras.models import Sequential
from keras.layers import Conv2D, Dropout, Input, Dense, Flatten, MaxPooling2D, BatchNormalization
from keras.preprocessing.image import ImageDataGenerator
from keras.losses import categorical_crossentropy
from keras.datasets import mnist

#%%
# Loading samples and limiting data
(x_train, y_train), (x_test, y_test) = mnist.load_data()

x_train = x_train[:30000]
y_train = y_train[:30000]
# x_test = x_test[:30000]
# y_test = y_test[:30000]

# %%
# Preprocessing data
x_train = x_train.reshape(x_train.shape[0],28,28,1)
x_test = x_test.reshape(x_test.shape[0],28,28,1)

x_train = x_train.astype('float32')
x_test = x_test.astype('float32')
x_train /= 255
x_test /= 255

y_train = keras.utils.to_categorical(y_train, num_classes=10)
y_test = keras.utils.to_categorical(y_test, num_classes=10)

datagen = ImageDataGenerator(
    rotation_range=30,
    width_shift_range=0.1,
    height_shift_range=0.1,
    zoom_range=0.5,
    horizontal_flip=True,
    vertical_flip=False
)

datagen.fit(x_train)

# %%
# Model building
model = Sequential()

model.add(Input(shape=(28,28,1))) 
model.add(BatchNormalization())
model.add(Dropout(0.3))
model.add(Conv2D(32, kernel_size=(3, 3),
                 activation='relu', padding='same'))
model.add(BatchNormalization())
model.add(Dropout(0.3))
model.add(Conv2D(32, kernel_size=(3, 3),
                 activation='relu', padding='same'))
model.add(BatchNormalization())
model.add(Dropout(0.3))
model.add(Conv2D(32, kernel_size=(3, 3),
                 activation='relu', padding='same'))
model.add(BatchNormalization())
model.add(Dropout(0.3))
model.add(Flatten()) 
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.2))
model.add(Dense(10, activation='softmax'))

model.compile(loss=categorical_crossentropy, optimizer='adam', metrics=['accuracy'])

# %%

model.fit(
    datagen.flow(x_train,y_train, batch_size=32), 
    validation_data=(x_test,y_test), 
    epochs=60,
    verbose=1)


#%%

from keras.models import load_model

dl = load_model('mymodel')
test = x_train[0].reshape(1,28,28,1)
print(dl.predict(test))
print(y_train[0])

