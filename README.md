# PopUp Meeting Rooms Project - Front End Web Application


## Documentation

All documentation will be stored in the `docs` folder of the repository.


## Back End Communication and fetching Data

It communicates with the Back End of our project (found [here](https://github.com/Popup-Meeting-Rooms-Project/Backend)) which serves the clients with the required data. Back End URLs are stored in environment variables for security and portability reasons.

Data must be in JSON form and follow these models:
- Room Object (must at least contain the following, may contain additional fields which will be disregarded).
```json
{
  "id": string,
  "room_number": number,
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

