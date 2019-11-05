GimmeYa a delivery app
===========================
restaurant app based on API with restaurants lists :D 

## REQUIREMENTS:
* NODE (v10 LTS)
* DOCKER (2.1 for MAC)


Gimme ya is separated in 2 parts
* Front end React
* Node Express API with Redis


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
Basic api diagram:

![alt text](https://github.com/balusio/gimmeya/blob/develop/app/assets/images/back-diagram.jpg)




## DOCKER INSTANCE 

the API needs a redis instance on default 6379 port to work, Docker is recommended to use a default instance of Redis

`docker run --name redis_api -p 6379:6379 -d redis`
