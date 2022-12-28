/* Global Variables */

const apiKey = "&appid=e324f0b14bf6f0b74679739cdd8807f5&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// refer to the button
const generate = document.getElementById("generate");

// Calling addEventListener function when user click the button generate.
generate.addEventListener("click", async () => {
  try {
    // get all required data from website
    const zipcode = document.getElementById("zip").value;
    const feel = document.getElementById("feelings").value;

    // Get temperature via API
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}${apiKey}`
    );
    const data = await res.json(); // transform json format to js object
    const temp = data.main.temp;

    // Send temperature, zipcode and date to local backend
    await fetch("/postData", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ temp, feel, date }), // transform js objct to json format
    });

    // Get data from local backend
    const alldata = await (await fetch("/getData")).json();
    //console.log(alldata);

    // Update UI
    document.getElementById("temp").innerHTML =
      Math.round(alldata.temp) + " degrees";
    document.getElementById("date").innerHTML = alldata.date;
    document.getElementById("content").innerHTML = alldata.feel;
  } catch (error) {
    console.log("error", error);
  }
});
