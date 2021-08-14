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

    let weather_events = ['Rain', 'Cold', 'Snow', 'Precipitation', 'Fog', 'Storm']

    weather_events.forEach(id => {
        let dropdownmenu = d3.select("#selDataset")
        dropdownmenu.append("option").text(id).property("value", id);
    });

    for (let i = 0; i < summary.length; i++) {

        let coordinates = [summary[i].lat, summary[i].lng]
        let city = summary[i].city

        console.log("coordinates:", coordinates)
        L.marker(coordinates).bindPopup(
            "<h2>" + `${city}` + "</h2>").addTo(myMap);
    };
});

// function init() {
//     console.log(filterid("snow"))

//     // set dropdown menu to display weather events

//     names.forEach(id => {
//         let dropdownmenu = d3.select("#selDataset")
//         dropdownmenu.append("option").text(id).property("value", id);
//     });

//     // set patient 940 as first displayed
//     let first_id = "940"
//     filterid(first_id)
// }

// /// change the display when a patient is selected
// d3.selectAll("#selDataset").on("change", updateplot);

// /// create a function that updates the graphs
// function updateplot() {
//     let update_id = d3.select("#selDataset").node().value;

//     d3.selectAll("#table").remove();

//     filterid(update_id);
// }

/// create a function that calls for the patient data and displays it
function filterid(indiv) {
    /// filter for the demographic data of the patient of interest
    let weather = summary.filter(weather => weather.type == indiv);

    /// create variables that hold demographic data
    let ethnicity = weather[0].ethnicity;
    let gender = weather[0].gender;
    let age = identifiers[0].age;
    let location = identifiers[0].location;
    let id = identifiers[0].id;
    let num_wash = identifiers[0].wfreq;

    /// filter patient sample data for the patient of interest
    let person = samples.filter(person => person.id == indiv);

    /// create variables to hold the sample data
    let person_data = person[0]
    let otu_id = person_data.otu_ids
    let otu_val = person_data.sample_values
    let otu_labels = person_data.otu_labels
    let otuid_label = otu_id.map(item => `OTU-${item}`);

    /// create a dictionary to recall demographics data
    let demoset = {
        "patientid": id,
        "ethnicity": ethnicity,
        "gender": gender,
        "age": age,
        "location": location,
        "num_wash": num_wash
    }

    /// create a dictionary to recall sample data
    let dataset = {
        "otulabel": otu_labels,
        "otuid": otu_id,
        "otuid_label": otuid_label,
        "values": otu_val
    };

    /// plot the graphs based on the sample and demographics data
    plotbar(dataset);
    plotbubble(dataset);
    plotdemographics(demoset);
    plotgauge(demoset);
}