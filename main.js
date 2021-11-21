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