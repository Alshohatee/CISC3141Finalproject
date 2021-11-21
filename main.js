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


