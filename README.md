# Canvas in NodeJS

Using canvas to create image of data received from STT and responds with the base64 code of the image.

![schema](images/schema.png)

The image that has been created with the data of STT.

![currentTemp](images/temperature.png)


## Getting Started

The following instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

cloning the repository:

```git clone git@github.com:vives-iotapplications-2018/CanvasNodeJS.git```

```npm install``` 

command to run the script

```npm start```

![npmStart](images/npmStart.png)

The app is a server that is waiting on a received post request and then an image is made with the value in the post request. The answer is the base64 code of the image.

You can simulate a post request with postman.

![simulatedPost](images/simulatedPost.png)

In the console you get the body of the post request.

![consolePost](images/consolePost.png)

The generated image:

![temperature](images/temperature.png)