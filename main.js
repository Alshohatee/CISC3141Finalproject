var countriesHolder = document.getElementById("country-holder");
var AllCountriesDataHolder = []

fetch("https://covid-193.p.rapidapi.com/statistics", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "fa25957e81msh7574df0c132647bp1d2905jsnedab3de64590"
        }
    })
    .then(response => response.json().then(data => {

        console.log(data)
        console.log(data.response)
        let countries_stat = data.response;
        AllCountriesDataHolder.push(data)
            //ordering the unsorting data in the api
        countries_stat.sort((a, b) => (a.cases.active < b.cases.active) ? 1 : (a.cases.active === b.cases.active) ? ((a.cases.active < b.cases.active) ? 1 : -1) : -1)
            //Getting all the country statistic using a loop
        for (let i = 1; i < countries_stat.length; i++) {
            console.log(countries_stat[i]);

            var newCase = numToCommas((countries_stat[i].cases.new !== null) ? countries_stat[i].cases.new : 0)
            activeCase = numToCommas((countries_stat[i].cases.active !== null) ? countries_stat[i].cases.active : 0)
            criticalCase = numToCommas((countries_stat[i].cases.critical !== null) ? countries_stat[i].cases.critical : 0)
            recoveredCase = numToCommas((countries_stat[i].cases.recovered !== null) ? countries_stat[i].cases.recovered : 0)
            deathsCaseNew = numToCommas((countries_stat[i].deaths.new !== null) ? countries_stat[i].deaths.new : 0)
            deathsCasetotal = numToCommas((countries_stat[i].deaths.total !== null) ? countries_stat[i].deaths.total : 0)
            count = countries_stat[i].country
            fillData(count, newCase, activeCase, criticalCase, recoveredCase, deathsCaseNew, deathsCasetotal)
        }
    })).catch(err => {
        console.log(err);
    });



function fillData(count, newCase, activeCase, criticalCase, recoveredCase, deathsCaseNew, deathsCasetotal) {

    countPara = document.createElement('h2')
    newCasePara = document.createElement('p')
    activeCasePara = document.createElement('p')
    criticalCasePara = document.createElement('p')
    recoveredCasePara = document.createElement('p')
    deathsCaseNewPara = document.createElement('p')
    deathsCasetotalPara = document.createElement('p')


    newCasePara.setAttribute("class", "grid-item")
    activeCasePara.setAttribute("class", "grid-item")
    criticalCasePara.setAttribute("class", "grid-item")
    recoveredCasePara.setAttribute("class", "grid-item recover")
    deathsCaseNewPara.setAttribute("class", "grid-item")
    deathsCasetotalPara.setAttribute("class", "grid-item")


    countPara.innerHTML = ` ${count}`
    newCasePara.innerHTML = ` New: ${newCase}`
    activeCasePara.innerHTML = `Active: ${activeCase}`
    criticalCasePara.innerHTML = `Critical: ${criticalCase}`
    recoveredCasePara.innerHTML = `Recovered: ${recoveredCase}`
    deathsCasetotalPara.innerHTML = `Deaths: ${deathsCaseNew}`
    deathsCaseNewPara.innerHTML = `Total Deaths: ${deathsCasetotal}`

    var eachCountryData = document.createElement('div')
    var DataHolder = document.createElement('div')
    DataHolder.setAttribute("class", "grid-container")
    eachCountryData.style.width = "100%"
    eachCountryData.style.height = "300px"
    eachCountryData.setAttribute("class", "country-holder")
    eachCountryData.setAttribute("id", count)

    eachCountryData.appendChild(countPara)
    DataHolder.appendChild(recoveredCasePara)
    DataHolder.appendChild(newCasePara)
    DataHolder.appendChild(activeCasePara)
    DataHolder.appendChild(criticalCasePara)
    DataHolder.appendChild(deathsCaseNewPara)
    DataHolder.appendChild(deathsCasetotalPara)
    eachCountryData.appendChild(DataHolder)
    countriesHolder.appendChild(eachCountryData)

}


function numToCommas(num) {
    num = Number(num)
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//basic map config with custom fills, mercator projection
var map = new Datamap({
    scope: 'world',
    element: document.getElementById('container1'),
    projection: 'mercator',
    height: 233,
    width: 233,
    fills: {
        defaultFill: '#580009'
    },
    geographyConfig: {
        popupTemplate: function(geo, data) {
            var country = AllCountriesDataHolder[0].response.find(function(countryData) {
                if (geo.properties.name == "United States of America")
                    return geo.properties.name
                else if (geo.properties.name == "Saudi Arabia")
                    return geo.properties.name
                else if (geo.properties.name == "United Arab Emirates")
                    return geo.properties.name
                else if (geo.properties.name == "united Kingdom")
                    return geo.properties.name
                else if (countryData.country == geo.properties.name) {


                    return geo.properties.name
                }

            })



            return ['<div class="hoverinfo"><strong>',
                geo.properties.name,
                `<ul>
                <li>New: ${numToCommas((country.cases["new"] !== null) ? country.cases["new"] : 0)}</li>
                <li>Active: ${numToCommas((country.cases["active"] !== null) ? country.cases["active"] : 0)}</li>
                <li>Critical: ${numToCommas((country.cases["critical"] !== null) ? country.cases["critical"] : 0)}</li>
                <li>Recovered: ${numToCommas((country.cases["recovered"] !== null) ? country.cases["recovered"] : 0)}</li>
                <li>New deaths: ${numToCommas((country.deaths["new"] !== null) ? country.deaths["new"] : 0)}</li>
                <li>total deaths: ${numToCommas((country.deaths["total"] !== null) ? country.deaths["total"] : 0)}</li>
                 </ul>`,
                '</strong></div>'
            ].join('');
        }
    }
})



document.getElementById("form").addEventListener("click", function(event) {
    event.preventDefault()

});
document.getElementById("inp").addEventListener("click", function(event) {
    let atag = document.getElementsByClassName('btn')

    // let btn = document.getElementsByClassName('btn')
    let country = document.getElementById("inp").value;
    namecountry = "#" + country


    console.log(atag)

    const newLocal = "href";
    // const name = btn.id
    // btn.setAttribute("name", "value");

    atag[0].setAttribute(newLocal, namecountry)

});

function myFunction() {

    let atag = document.getElementsByClassName('btn')
        // btn.setAttribute("href", country)
    document.getElementById(atag.href).scrollIntoView();

}

function search(string) {
    window.find(string);
}
// var preview = document.querySelectorAll("form");
// for (var i = 0; i < preview.length; i++) {
//     preview[i].setAttribute("namecountry", 'href');
// }