function map1() 
{
    
    let myMap = L.map("map", {
        center: [39, -98],
        zoom: 3
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    let json = './resources/weatherhist.js'

    // let url = "https://127.0.0.1:5000/api/v1.0/weatherhist"

    // let summaryview = data.summaryview
    // let names = data[0].names
    // let samples = data[0].samples

    d3.json(json).then(function (data) {
        console.log(data);

        for (let i = 0; i < summary.length; i++) {

            let coordinates = [summary[i].lat, summary[i].lng]
            let city = summary[i].city

            console.log("coordinates:", coordinates)
            L.marker(coordinates).bindPopup(
                "<h2>" + `${city}` + "</h2>").addTo(myMap);
        };
    });
}

function bubbleMap(){

    let myMap = L.map("map2", {
        center: [39, -98],
        zoom: 4
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    let json = './resources/weatherhist.js'

    // let url = "https://127.0.0.1:5000/api/v1.0/weatherhist"

    // let summaryview = data.summaryview
    // let names = data[0].names
    // let samples = data[0].samples

    d3.json(json).then(function (data) {
        console.log(data);

       // for (let i = 0; i < summary.length; i++) {

           // let coordinates = [summary[i].lat, summary[i].lng]
            //let city = summary[i].city

            //console.log("coordinates:", coordinates)
            //L.marker(coordinates).bindPopup(
             //   "<h2>" + `${city}` + "</h2>").addTo(myMap);
        //};
    });

}

bubbleMap();
map1();
