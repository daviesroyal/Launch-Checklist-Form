// Write your JavaScript code here!
window.addEventListener("load", function(){

   let form = document.querySelector("form");
   let pilotName = document.querySelector("input[name=pilotName]").value;
   let copilotName = document.querySelector("input[name=copilotName]").value;
   let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
   let cargoMass = document.querySelector("input[name=cargoMass]").value;
   let faultyItemsList = document.getElementById("faultyItems");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById("launchStatus");
   let missionTarget = document.getElementById("missionTarget");

   form.addEventListener("submit", function(event){
      if (document.querySelector("input[type=text]").value === "") {
         window.alert("All fields are required!");
         event.preventDefault();
      } 

      if (typeof pilotName !== "string" || typeof copilotName !== "string") {
         window.alert("Names must be strings!");
         event.preventDefault();
      } else {
         pilotStatus.innerHTML = `Pilot ${pilotName} Ready`;
         copilotStatus.innerHTML = `Co-Pilot ${copilotName} Ready`;
      }

      if (isNaN(Number(fuelLevel)) === true) {
         window.alert("Fuel level must be a number!");
         event.preventDefault();
      }
      
      if (isNaN(Number(cargoMass)) === true) {
         window.alert("Cargo mass must be a number!");
         event.preventDefault();
      }
      
      if (fuelLevel < 10000) {
         faultyItemsList.style.visibility = "visible";
         fuelStatus.innerHTML = "Not enough fuel for journey!";
         launchStatus.innerHTML = "Shuttle not ready for launch.";
         launchStatus.style.color = "red";
         event.preventDefault();
      } else if (cargoMass > 10000) {
         faultyItemsList.style.visibility = "visible";
         cargoStatus.innerHTML = "Too much mass for takeoff!";
         launchStatus.innerHTML = "Shuttle not ready for launch.";
         launchStatus.style.color = "red";
         event.preventDefault();
      } else {
         launchStatus.innerHTML("Shuttle ready for launch!");
         launchStatus.style.color = "green";
      }
   });
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         let missionNumber = Math.floor(Math.random()*json.length);
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
