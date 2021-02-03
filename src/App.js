import "./App.css";
import React, { useState } from "react";

function App() {
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");

  var request = new XMLHttpRequest();
  var IpDataKey = "dcb19aafdd3accd0ca61b014f91a6cc5888d57f4f703a9758da3751e";
  var GoogleAPIkey = "AIzaSyCdQymwSuF0P6Ee-ffX0ZtWjpJdpaT5eLk";

  try {
    request.open("GET", `https://api.ipdata.co/?api-key=${IpDataKey}`); //Get The IP
    request.setRequestHeader("Accept", "application/json");
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        var json = JSON.parse(this.responseText);
        setLocation(json.country_name + "," + json.city);
        setRegion(json.continent_code);
      }
    };
    request.send();
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Location</h1>
        {location === "" || region === "" ? (
          <div>
            <span>Could not get the data</span>
          </div>
        ) : (
          <div>
            <iframe
              title="map"
              width="600"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=${GoogleAPIkey}&q=${location}&region=${region}`}
              allowFullScreen
            ></iframe>
          </div>
        )}
      </header>
    </div>
  );
}
export default App;
