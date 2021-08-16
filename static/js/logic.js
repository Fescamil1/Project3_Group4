
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

runupdate();

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
  console.log(dataset);
        // Define arrays to hold the event markers.
        var  Rainmakers = [];
        var StormMarkers = [];
        var  Coldmakers = [];
        var HailMarkers = [];
        var  Snowmakers = [];
        var PrecipitationMarkers = [];
        var FogMarkers = [];
        


        for (var index = 0; index < dataset.length;index++)
        {

            if (dataset[index].year == "2020" && dataset[index].type=='Rain' )
            {  
        
                Rainmakers.push(
                    L.circle([dataset[index].lat, dataset[index].lng],{
                        Opacity: 0.8,
                        fillOpacity: 0.8,
                        fillColor: eventColor(dataset[index].type),
                        color: eventColor(dataset[index].type),
                        radius: DurationRadius(dataset[index].duration),
                        stroke: true,
                        weight: 0.5
                      })
                );
            }             

            if (dataset[index].year == "2020" && dataset[index].type=='Storm' )
            {  
                
                StormMarkers .push(
                    L.circle([dataset[index].lat, dataset[index].lng],{
                        Opacity: 0.8,
                        fillOpacity: 0.8,
                        fillColor: eventColor(dataset[index].type),
                        color: eventColor(dataset[index].type),
                        radius: DurationRadius(dataset[index].duration),
                        stroke: true,
                        weight: 0.5
                      })
                );
            }             

            if (dataset[index].year == "2020" && dataset[index].type=='Cold' )
            {  
                
                Coldmakers.push(
                    L.circle([dataset[index].lat, dataset[index].lng],{
                        Opacity: 0.8,
                        fillOpacity: 0.8,
                        fillColor: eventColor(dataset[index].type),
                        color: eventColor(dataset[index].type),
                        radius: DurationRadius(dataset[index].duration),
                        stroke: true,
                        weight: 0.5
                      })
                );
            }             
            if (dataset[index].year == "2020" && dataset[index].type=='Hail' )
            {  
                
                HailMarkers.push(
                    L.circle([dataset[index].lat, dataset[index].lng],{
                        Opacity: 0.8,
                        fillOpacity: 0.8,
                        fillColor: eventColor(dataset[index].type),
                        color: eventColor(dataset[index].type),
                        radius: DurationRadius(dataset[index].duration),
                        stroke: true,
                        weight: 0.5
                      })
                );
            }             
            if (dataset[index].year == "2020" && dataset[index].type=='Snow' )
            {  
                Snowmakers.push(
                    L.circle([dataset[index].lat, dataset[index].lng],{
                        Opacity: 0.8,
                        fillOpacity: 0.8,
                        fillColor: eventColor(dataset[index].type),
                        color: eventColor(dataset[index].type),
                        radius: DurationRadius(dataset[index].duration),
                        stroke: true,
                        weight: 0.5
                      })
                );
            }             
            if (dataset[index].year == "2020" && dataset[index].type=='Precipitation' )
            {  
                
                PrecipitationMarkers.push(
                    L.circle([dataset[index].lat, dataset[index].lng],{
                        Opacity: 0.8,
                        fillOpacity: 0.8,
                        fillColor: eventColor(dataset[index].type),
                        color: eventColor(dataset[index].type),
                        radius: DurationRadius(dataset[index].duration),
                        stroke: true,
                        weight: 0.5
                      })
                );
            }             
            if (dataset[index].year == "2020" && dataset[index].type=='Fog' )
            {  
                
                FogMarkers.push(
                    L.circle([dataset[index].lat, dataset[index].lng],{
                        Opacity: 0.8,
                        fillOpacity: 0.8,
                        fillColor: eventColor(dataset[index].type),
                        color: eventColor(dataset[index].type),
                        radius: DurationRadius(dataset[index].duration),
                        stroke: true,
                        weight: 0.5
                      })
                );
            }             
               
           
      } // end of for loop
        

        // Add a tile layer (the background map image) to our map
        // Use the addTo method to add objects to our map
        var street= L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }); //.addTo(myMap2);  

        // Create the separate layer groups
        var rain = L.layerGroup(Rainmakers);
        var storm = L.layerGroup(StormMarkers);
        var cold = L.layerGroup(Coldmakers);
        var hail = L.layerGroup(HailMarkers);
        var snow = L.layerGroup(Snowmakers);
        var perci = L.layerGroup(PrecipitationMarkers);
        var fog = L.layerGroup(FogMarkers);

        // Create a baseMaps object.
        var baseMaps = {
            "Base Map": street,
        };

        // Create an overlay object.
        var overlayMaps = {
            "Rain": rain,
            "Storm": storm,
            "Cold": cold,
            "Hail": hail,
            "Snow": snow,
            "Percipitation": perci,
            "Fog": fog
        };
        

         // Create an initial map object
        // Set the longitude, latitude, and the starting zoom level
        let myMap2 = L.map("bubble", {
            center: [39, -98],
            zoom: 4.3,
            layers: [street, rain, storm, cold, hail, snow, perci, fog]
        });

        // Pass our map layers to our layer control.
        // Add the layer control to the map.
            L.control.layers(baseMaps, overlayMaps, {
                collapsed: false
            }).addTo(myMap2);

        function DurationRadius(duration) 
        {
            if (duration === 0) {return 1;}
            return duration * 6000;
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
                return "orange";
            case event =='Fog':
                return "yellow";
        
            }
        }
}

