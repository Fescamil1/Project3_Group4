let myMap = L.map("map", {
    center: [39, -98],
    zoom: 3
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// let json = './resources/weatherhist.js'

let json = "https://127.0.0.1:5000/api/v1.0/summaryview"

let weather_events = ['Rain', 'Storm', 'Cold', 'Hail', 'Snow', 'Precipitation', 'Fog',]
let cities = ['New York', 'Philadelphia', 'Chicago', 'Houston', 'San Antonio', 'Dallas', 'Austin', 'Phoenix', 'Los Angeles', 'San Diego']

weather_events.forEach(id => {
    let dropdownmenu = d3.select("#selDataset1")
    dropdownmenu.append("option").text(id).property("value", id);
});

cities.forEach(id => {
    let dropdownmenu = d3.select("#selDataset2")
    dropdownmenu.append("option").text(id).property("value", id);
});

runupdate()

d3.selectAll("#selDataset1").on("change", runupdate);
d3.selectAll("#selDataset2").on("change", runupdate);

function runupdate() {
    let event = d3.select("#selDataset1").node().value;
    let city = d3.select("#selDataset2").node().value;

    d3.json(json).then(function (data) {
        console.log(data);

        let summary = data

        for (let i = 0; i < summary.length; i++) {

            let coordinates = [summary[i].lat, summary[i].lng]
            let city = summary[i].city

            console.log("coordinates:", coordinates)
            L.marker(coordinates).bindPopup(
                "<h2>" + `${city}` + "</h2>").addTo(myMap);
        }
        barchart(summary, event, city)
    });
}

function barchart(dataset, event, city) {
    let eventfiltered = dataset.filter(weather => weather.type == event);
    let ev_city_fil = eventfiltered.filter(weather => weather.city == city);

    let years = []
    let avgs = []

    ev_city_fil.forEach(function (bar) {
        years.push(bar.year)
        avgs.push(bar.avg_perc_year)
    })

    //getting the bar chart 
    var trace = [
        {
            x: years,
            y: avgs,
            type: 'bar',
            marker: {
                color: 'purple'
            }
        }
    ];
    var layout = {
        title: `% Days of ${event} in ${city}`,
        xaxis: {
            title: 'Year'
        },
        yaxis: {
            title: '% Days'
        }
    }
    Plotly.newPlot('bar', trace, layout)
};