
let apiKey="01c3341a6290780238f6a88215965a37";

let currentCoords={ lat: -0.224043, lng: -78.512833 };
// funcion para llamar al api del clima
const weather = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentCoords.lat}&lon=${currentCoords.lng}&appid=${apiKey}`);
    const data = await response.json();
    output(data);
    console.log('datos json',data);
};

// Leaflet documentacion para crear el mapa 
var map = L.map("map").setView([-0.224043, -78.512833], 13);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// leafleat documentacion para crear el popup
var popup = L.popup();

const onMapClick = (e) => {
    popup
        .setLatLng(e.latlng)
        .setContent("Hiciste click en el mapa en: " + e.latlng.toString())
        .openOn(map);
};


// funcion para obtener las coordenadas cuando se hace click en el mapa 
const getCoords = (c) => {
    let coords = c.latlng;
    currentCoords = coords;
    
};

// kelvin a farenheit
const kelvinToFahrenheit = kelvin => (kelvin - 273.15) * 9/5 + 32;
// kelvin a celsius
const kelvinToCelsius = kelvin => kelvin - 273.15;


// funcion par mostrar los datos
const output = (c) => {
    document.getElementById("city").innerText = c.name;
    document.getElementById("temperatureC").innerText = kelvinToCelsius(c.main.temp).toFixed(1);
    document.getElementById("temperatureF").innerText = kelvinToFahrenheit(c.main.temp).toFixed(1);
    document.getElementById("weather").innerText = c.weather[0].description;
};


//cuando se hace click en el mapa:
map.on("click", getCoords);
map.on('click', onMapClick);
map.on("click", weather);



