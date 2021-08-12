let myMap = L.map("map", {
    center: [39, -98],
    zoom: 5
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let json = './resources/weatherhist.js'
// let url = "https://127.0.0.1:5000/api/v1.0/weatherhist"

d3.json(json).then(function (data) {
    console.log(data);

    let summary = data.summaryview

    for (let i = 0; i < summary.length; i++) {

        let coordinates = [summary[i].lat, summary[i].lng]
        let city = summary[i].city

        console.log("coordinates:", coordinates)
        L.marker(coordinates).bindPopup(
            "<h2>" + `${city}` + "</h2>").addTo(myMap);
    };
});
