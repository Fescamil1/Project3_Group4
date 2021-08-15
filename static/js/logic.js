
let myMap = L.map("map", {
    center: [39, -98],
    zoom: 3
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// let json = './resources/weatherhist.js'

let json = "http://127.0.0.1:5000/api/v1.0/summaryview"

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
        // Add markers for city 
        for (let i = 0; i < summary.length; i++) {

            let coordinates = [summary[i].lat, summary[i].lng]
            let city = summary[i].city

            console.log("coordinates:", coordinates)
            L.marker(coordinates).bindPopup(
                "<h2>" + `${city}` + "</h2>").addTo(myMap);
        }
        barchart(summary, event, city);

        //Call the functions to ceate the bubble map and send summary data
        createBubbleMap(summary);
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
//***********Bubble MAP Section ***************** */

function createBubbleMap(dataset) 
{        
      
        // Create an initial map object
        // Set the longitude, latitude, and the starting zoom level
        let myMap2 = L.map("bubble", {
            center: [39, -98],
            zoom: 4,
        });

        // Add a tile layer (the background map image) to our map
        // Use the addTo method to add objects to our map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap2);;

        //data markers should reflect the duration of the event by radius and type of event by color. 
        //Events lasting longer should appear darker in color.
        function styleInfo(dataset) 
        {
            return {
            opacity: 1,
            fillOpacity: 0.8,
            fillColor: eventColor(dataset.type),
            color: "black",
            radius: DurationRadius(dataset.avg_perc_year),
            stroke: true,
            weight: 0.5
            };
        }

        // set the radius from duration
        function DurationRadius(duration) 
        {
            if (duration === 0) {return 1;}
            return duration * 10;
        }

        
        function eventColor(event) 
        {
            switch(true) {
            case event == 'Rain':
                return "blue";
            case event == 'Storm':
                return "red";
            case event == 'Cold':
                return "purple";     
            case event =='Hail':
                return "pink";
            case event =='Snow':
                return "green";
            case event =='Precipitation':
                return "gold";
            case event =='Fog':
                return "yellow";
        
            }
        }
}
