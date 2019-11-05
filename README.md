GimmeYa a delivery app
===========================
restaurant app based on API with restaurants lists :D 

## REQUIREMENTS:
* NODE (v10 LTS)
* DOCKER (2.1 for MAC)


Gimme ya is separated in 2 parts
* Front end React
* Node Express API with Redis

## ENVIRONMENT 

To use this app you will need your own access to the API URL and data passing the through the .env file that will be readed by 
the `env_loader.sh` this files exports all variables to be consumed by the node `process.env`

## FRONT END 

The application is based on: 

* [Material UI] (https://material-ui.com/)library for React,
* Axios for async calls
* Webpack Bundler
* [leaflet](https://leafletjs.com/) for map handling

Basic react app diagram:

![alt text](https://github.com/balusio/gimmeya/blob/develop/app/assets/images/front-diagram.jpg)


## API

The API follows a authMiddleware/route/Controller app.
 > the Docker Isntance is required see DOCKER INSTANCE

The API is based on: 
* Expressjs
* Axios for async calls to the API
* CORS module

Basic auth api diagram:

![alt text](https://github.com/balusio/gimmeya/blob/develop/app/assets/images/back-diagram.jpg)

## DOCKER INSTANCE 

the API needs a redis instance on default 6379 port to work, Docker is recommended to use a default instance of Redis

`docker run --name redis_api -p 6379:6379 -d redis`

## RUN THE APP 

The secuence to get the App instances working are : 

* set the front end on root folder running `npm i` and `npm run build` this will directly use the server.js file at root level and provide a build version of the front end (default on port 8080)
* *Important* set a redis instance, by default will be readed on port 6379, keep in mind if you are using a different port, set in on the client use of the redis node instance
* set the API inside the folder `api` running `npm i` and `npm run dev` for run the API on dev mode and check the querys and log handlers



