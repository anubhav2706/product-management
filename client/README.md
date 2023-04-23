# React Product Management

The project is created using `create-react-app` (https://github.com/facebook/create-react-app).

## Description

- This is the source code for Product Management Admin Page
- Author : Rangga Rifqi Pratama (https://ranggarifqi.com)
- License : -
- Framework : ReactJS
- State Management : MobX
- Router : React Router Dom
- UI Component : Material UI

## How to Install

1. Clone the repo
```
https://github.com/ranggarifqi/react-product-management.git
```
2. `cd react-product-management`
3. `npm i`

## Environment Setup

Asumming that you're already inside the project `root` directory : 
1. `cp .env.example .env` IF there's no `.env` file yet
2. Edit `.env` file so the configuration will look like this :
```
REACT_APP_API_BASE_URL="http://localhost:3000"
```

## Running the App
Asumming that you're already inside `root` directory :
1. Ensure that the API Server is running first
2. `npm start` to start the app
3. If it's asking you to change the port, press Y
3. The app will be available at `http://localhost:3001`

## About Elevenia

There was a problem when i tried to fetch from Elevenia API.

It was CORS. So i tried to use proxy using (https://cors-anywhere.herokuapp.com/)

But the request took so long to process. 

So i created a separate branch so we can check the feature.

`git checkout feature/elevenia`

### First thing you have to do after checking out to `feature/elevenia` branch is to update your env configuration. check `.env.example`

### Elevenia API is called if we don't have any products data yet