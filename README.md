# Front End Web Application

Responsive web application to display the list of Pop Up Rooms and their status, fetched from the Back End server and with automatic updates. Suitable for both desktop and mobile browsers. Built using React.

[![Linted & built](https://github.com/Popup-Meeting-Rooms-Project/Frontend/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Popup-Meeting-Rooms-Project/Frontend/actions/workflows/ci.yml)

----

- [Title](#front-end-web-application)
  - [Setup](#setup)
    - [Enviroment variables](#environment-variables)
    - [Deployment](#deployment)
  - [Back End Communication](#back-end-communication-and-fetching-data)
    - [Data Format](#data-format)
    - [Main.js](#mainjs)
    - [Main-MQTT.js](#main-mqttjs)
  - [Testing and CI](#testing-and-ci)
  - [Third Party libraries used](#third-party-libraries-used)


----

## Setup

Project dependencies can be installed using `npm install` from the project folder.

For CI setups, if the package-lock.json is present -it should be-, the command `npm ci` can be used to speed up the process.

### Environment Variables

The following environment variables need to be set for the correct functioning of the application:

    REACT_APP_API_URL=rest-api-url
    REACT_APP_SSE_URL=sse-url-and-endpoint

These are to be used if the updates are received through MQTT instead of Server Sent Events (not at the moment).

    REACT_APP_MQTT_URL=mqtt-broker-url
    REACT_APP_MQTT_TOPIC=project-topic

These can be stored in the respective `.env` local files, using the names `.env.development.local` and `.env.production.local`. Remember to add these to .gitignore if they are not present already!


### Deployment

The application can be build locally using `npm run build` or automatically using either GitHub Actions or your cloud platform of choice (e.g. Azure, Heroku, etc.). Remember to set the environment variables if not using your own environment!

The production build can be served using a static web server. On the project documentation files there's a lenghtier explanation on how to have it running on nginx inside a docker container. This can be found inside the `docs` folder. Scripts to help automate the deployment can be found inside the `scripts` folder.


## Documentation

The basic sturcture of the application and its functioning is well explained in the comments on the source code files. Additional information is contained in this readme, including how to set-up and deploy and what is expected from the used Back-End.

All other documentation will be stored in the `docs` folder of the repository.


## Back End Communication and fetching Data

It communicates with the Back End of our project (found [here](https://github.com/Popup-Meeting-Rooms-Project/Backend)) which serves the clients with the required data. Back End URLs are stored in environment variables for security and portability reasons.

### Data Format

Data must be in JSON form and follow these models:
- Room Object (must at least contain the following, may contain additional fields which will be disregarded).
```json
{
  "id": string,
  "room_name": string,
  "building_floor": number,
  "detected": boolean
 }
 ```
  

- Status update
```json
{
  "id": string,
  "detected": boolean
}
```


### Main.js

This is the main view of our application taking care of data handling and containing both the Table and Map view for display.

Initial data is obtained using "fetch" to perform a `GET` request to the REST API and updates to rooms' statuses are done with Server Sent Events.


### Main-MQTT.js

This was created as a POC during the first Sprint, when the teams were still debating whether the Front End should get updates directly from the MQTT broker or the Node server (via SSEs). Although we decided against using MQTT from the client's side, the implementation is left here as it might be of value (as of the beginning of the second Sprint, it was working correctly). The REST API is used for initial fetching of the data, as in the final version.


## Testing and CI

Unit tests have been written using React's built-in test tools for the following components: App, Header, RoomList and Map.

Tests are run automatically when push/merge into the main branch, as part of our CI setup which uses GitHub Actions. The script can be found inside the .github/workflows folder.

The CI script contains two jobs:

- Running a linter ([Super-Linter](https://github.com/github/super-linter)).
- Building the production app and running the tests.

The script sets the environment variables from previously-set GitHub "Secrets" when running. Please refer to the GitHub Docs on how to set these up.

If all the tasks succeed, the build folder is archived as an artifact and can be downloaded from the repository. This can be used to speed up (or automate) new deployments).


## Third Party libraries used

Our project uses the following third party component libraries:

[react-table](https://github.com/tannerlinsley/react-table) v7 for building our table used to display the data.

Licensed under the MIT license. Copyright (c) 2016 Tanner Linsley

[MUI](https://github.com/mui-org/material-ui), formerly Material-UI, used for UI components based on Material Design.

Licensed under the MIT license. Copyright (c) 2014 Call-Em-All
