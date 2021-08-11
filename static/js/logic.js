let myMap = L.map("map", {
    center: [39, -98],
    zoom: 5
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let url = "https://127.0.0.1:5000/api/v1.0/weatherhist"

d3.json(url).then(function (data) {
    console.log(data);

    for (let i = 0; i < data.length; i++) {

        let coordinates = [data[i].lat, data[i].lon]
        let city = data[i].city

        console.log(coordinates)
        L.marker(coordinates, {
            radius: (eq_features[i].properties.mag * 1e4),
            color: color,
            opacity: 1,
            fillOpacity: 0.8,
            fillColor: color
        }).bindPopup(
            "<h2>" + `City: ${city}` + "</h2>").addTo(myMap);
    };
});
