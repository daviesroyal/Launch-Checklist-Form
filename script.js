// Write your JavaScript code here!
window.addEventListener("load", function () {

   let form = document.querySelector("form");

   form.addEventListener("submit", function (event) {

      let pilotName = document.getElementById("pilotName").value;
      let copilotName = document.getElementById("copilotName").value;
      let fuelLevel = document.getElementById("fuelLevel").value;
      let cargoMass = document.getElementById("cargoMass").value;
      let inputAreas = document.querySelectorAll("input[type=text]");
      let faultyItemsList = document.getElementById("faultyItems");
      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");
      let launchStatus = document.getElementById("launchStatus");
      let canceled = false;

      for (let i = 0; i < inputAreas.length; i++) {
         if (inputAreas[i].value === "") {
            event.preventDefault();
            return window.alert("All fields are required!");
         }
      }

      if (!isNaN(pilotName)) {
         window.alert("Pilot name must be a string!");
         event.preventDefault();
         canceled = true;
      } else {
         pilotStatus.innerHTML = `Pilot ${pilotName} is ready for launch.`;
      }

      if (!isNaN(copilotName)) {
         window.alert("Co-Pilot name must be a string!");
         event.preventDefault();
         canceled = true;
      } else {
         copilotStatus.innerHTML = `Co-Pilot ${copilotName} is ready for launch.`;
      }

      if (isNaN(fuelLevel)) {
         window.alert("Fuel level must be a number!");
         event.preventDefault();
         canceled = true;
      } else if (fuelLevel < 10000) {
         faultyItemsList.style.visibility = "visible";
         fuelStatus.innerHTML = "Not enough fuel for journey!";
         launchStatus.innerHTML = "Shuttle not ready for launch.";
         launchStatus.style.color = "red";
         event.preventDefault();
         canceled = true;
      }

      if (isNaN(cargoMass)) {
         window.alert("Cargo mass must be a number!");
         event.preventDefault();
         canceled = true;
      } else if (cargoMass > 10000) {
         faultyItemsList.style.visibility = "visible";
         cargoStatus.innerHTML = "Too much mass for takeoff!";
         launchStatus.innerHTML = "Shuttle not ready for launch.";
         launchStatus.style.color = "red";
         event.preventDefault();
         canceled = true;
      }

      if (canceled === false) {
         launchStatus.innerHTML = "Shuttle ready for launch!";
         launchStatus.style.color = "green";
      }
         
   });
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json) {
         let missionNumber = Math.floor(Math.random() * json.length);
         let missionTarget = document.getElementById("missionTarget");
         missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[missionNumber].name}</li>
            <li>Diameter: ${json[missionNumber].diameter}</li>
            <li>Star: ${json[missionNumber].star}</li>
            <li>Distance from Earth: ${json[missionNumber].distance}</li>
            <li>Number of Moons: ${json[missionNumber].moons}</li>
      </ol>
      <img src="${json[missionNumber].image}"></img>`
      });
   });
});
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
