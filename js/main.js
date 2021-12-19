import { weatherAPI, quotesAPI, newsAPI } from './api';
import { getUserInfo } from './userInfo';
import { init } from './background'
import { zipToState } from './zipToState';

fetch(`https://api.covidactnow.org/v2/states.json?apiKey=${process.env.API_KEY}`)
  .then(response => response.json())
  .then(data => {
    fill(data)
  });

function fill(data) {
  let stats = document.getElementById("covid-stats");
  for (let i = 0; i < data.length; i++) {
    thenum = localStorage.getItem("zip");
    if (data[i]['state'] == zipToState(thenum)) {
      cases = document.createElement('p')
      deaths = document.createElement('p')
      newCases = document.createElement('p')
      newDeaths = document.createElement('p')
      vaccinationsCompleted = document.createElement('p')
      vaccinationsInitiated = document.createElement('p')

      cases.innerHTML = "Cases: " + (data[i]['actuals']['cases']).toLocaleString();
      deaths.innerHTML = "Deaths: " + (data[i]['actuals']['deaths']).toLocaleString();
      newCases.innerHTML = "New Cases: " + (data[i]['actuals']['newCases']).toLocaleString();
      newDeaths.innerHTML = "New Deaths: " + (data[i]['actuals']['newDeaths']).toLocaleString();
      vaccinationsCompleted.innerHTML = "Vaccinations Completed: " + (data[i]['actuals']['vaccinationsCompleted']).toLocaleString();
      vaccinationsInitiated.innerHTML = "Vaccinations Initiated: " + (data[i]['actuals']['vaccinationsInitiated']).toLocaleString();

      stats.appendChild(cases)
      stats.appendChild(deaths)
      stats.appendChild(newCases)
      stats.appendChild(newDeaths)
      stats.appendChild(vaccinationsCompleted)
      stats.appendChild(vaccinationsInitiated)
      document.getElementById("state").innerHTML = data[i]['state'];
    }
  }
}

if (localStorage.getItem("name") == null)
  getUserInfo();
else
  document.getElementById("name-text").innerHTML = localStorage.getItem("name");

init();

weatherAPI()
  .then(res => {
    // console.log(res);
    setWeather(res.name, res.weather[0].icon, res.main.temp, res.main.temp_max, res.main.temp_min);
  })
  .catch(err => {
    console.log(err);
  });

let setWeather = (name, weatherIcon, temp, hi, lo) => {
  document.getElementById("location").innerHTML = name;
  document.getElementById("weather-icon").src = weatherIcon;
  let src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  document.getElementById("weather-icon").setAttribute("src", src);

  temp = Math.round((temp * 9) / 5 - 459.67).toFixed(0);

  document.getElementById("temperature").innerHTML = `${temp}°F`;

  hi = Math.round((hi * 9) / 5 - 459.67).toFixed(0);
  lo = Math.round((lo * 9) / 5 - 459.67).toFixed(0);

  document.getElementById("hi").innerHTML = `High: ${hi}°F`;
  document.getElementById("lo").innerHTML = `Low: ${lo}°F`;
};

quotesAPI()
  .then(res => {
    // console.log(res);
    if (!res)
      setQuote("No quote found!", "No author found!");
    else
      setQuote(res.content, res.author);
  })
  .catch(err => {
    console.log(err);
  });

let setQuote = (quote, author) => {
  document.getElementById("quote-text").innerHTML = quote;
  document.getElementById("quote-author-text").innerHTML = author;
};

newsAPI()
  .then(res => {
    // console.log(res)

    let newsArray = res.articles;
    let fixedArray = [];

    for (let i = 0; i < 4; i++) {
      fixedArray.push(newsArray[i]);
    }

    // console.log(fixedArray[0].title);
    setNews(res.totalResults, fixedArray);
  })
  .catch(err => console.log(err));

let setNews = (totalResults, news) => {
  let headlinesContainer = document.getElementById("headlines-container");
  // let headlines = document.createElement("div");
  // headlines.className = "headlines";

  for (let i = 0; i < news.length; i++) {
    let headline = document.createElement("div");
    headline.className = "headline";
    headline.id = `headline-${i}`;

    headline.innerHTML = `<a href="${news[i].url}" target="_blank">${news[i].title}</a>`;

    headlinesContainer.appendChild(headline);
  }
};