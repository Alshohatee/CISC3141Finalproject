import { weatherAPI, quotesAPI, newsAPI } from './api';
import { getUserInfo } from './userInfo';
import { init } from './background'
import { zipToState } from './zipToState';
import "bootstrap-icons/font/bootstrap-icons.css";

fetch(`https://api.covidactnow.org/v2/states.json?apiKey=${process.env.API_KEY}`)
  .then(response => response.json())
  .then(data => {
    fill(data)
  });

function fill(data) {
  let stats = document.getElementById("covid-stats");

  for (let i = 0; i < data.length; i++) {
    if (data[i]['state'] == zipToState(localStorage.getItem("zip"))) {

      /* COVID Cases and Deaths */
      casesAndDeathsContainer = document.createElement("div");
      casesAndDeathsContainer.className = "all-stats-containers";

      /* Cases */
      cases = document.createElement('div');
      casesNumContainer = document.createElement('div');
      casesNumContainer.className = "test";

      cases.className = 'stats-title'
      cases.innerHTML = `Cases`;

      casesNum = document.createElement('div')
      casesNum.className = 'stats-num'
      casesNum.innerHTML = `${(data[i]['actuals']['cases']).toLocaleString()}`;
      casesNumContainer.appendChild(cases);
      casesNumContainer.appendChild(casesNum);

      casesAndDeathsContainer.appendChild(casesNumContainer); // Final to Append

      /* Deaths */
      deathsNumContainer = document.createElement('div');
      deathsNumContainer.className = "deaths-num-container";

      deaths = document.createElement('div')
      deaths.className = 'stats-title'
      deaths.innerHTML = `Deaths`;

      deathsNum = document.createElement('div')
      deathsNum.className = 'stats-num'
      deathsNum.innerHTML = `${(data[i]['actuals']['deaths']).toLocaleString()}`;

      deathsNumContainer.appendChild(deaths);
      deathsNumContainer.appendChild(deathsNum);
      casesAndDeathsContainer.appendChild(deathsNumContainer); // Final to Append

      /* COVID New Cases and Deaths */
      newCasesAndDeathsContainer = document.createElement("div");
      newCasesAndDeathsContainer.className = "all-stats-containers";

      /* New Cases */
      newCases = document.createElement('div')
      newCases.className = 'stats-title'
      newCases.innerHTML = "New Cases"

      newCasesNum = document.createElement('div')
      newCasesNum.className = 'stats-num'
      newCasesNum.innerHTML = `${(data[i]['actuals']['newCases']).toLocaleString()}`;

      newCasesNumContainer = document.createElement('div')
      newCasesNumContainer.className = "test";
      newCasesNumContainer.appendChild(newCases);
      newCasesNumContainer.appendChild(newCasesNum);

      newCasesAndDeathsContainer.appendChild(newCasesNumContainer); // Final to Append

      /* New Deaths */
      newDeaths = document.createElement('div')
      newDeaths.className = 'stats-title'
      newDeaths.innerHTML = "New Deaths";

      newDeathsNum = document.createElement('div')
      newDeathsNum.className = 'stats-num'
      newDeathsNum.innerHTML = `${(data[i]['actuals']['newDeaths']).toLocaleString()}`;

      newDeathsNumContainer = document.createElement('div')
      newDeathsNumContainer.className = "test";
      newDeathsNumContainer.appendChild(newDeaths);
      newDeathsNumContainer.appendChild(newDeathsNum);

      newCasesAndDeathsContainer.appendChild(newDeathsNumContainer); // Final to Append

      /* COVID Vaccinations */
      vaccinationsContainer = document.createElement("div");
      vaccinationsContainer.className = "all-stats-containers icky";

      /* Vaccinations Completed */
      vaccinationsCompleted = document.createElement('div')
      vaccinationsCompleted.className = 'stats-title'
      vaccinationsCompleted.innerHTML = "Vaccinations Completed"

      vaccinationsCompletedNum = document.createElement('div')
      vaccinationsCompletedNum.className = 'stats-num'
      vaccinationsCompletedNum.innerHTML = `${(data[i]['actuals']['vaccinationsCompleted']).toLocaleString()}`

      vaccinationsCompletedNumContainer = document.createElement('div')
      vaccinationsCompletedNumContainer.className = "test";
      vaccinationsCompletedNumContainer.appendChild(vaccinationsCompleted);
      vaccinationsCompletedNumContainer.appendChild(vaccinationsCompletedNum);

      vaccinationsContainer.appendChild(vaccinationsCompletedNumContainer); // Final to Append

      // First Dose
      vaccinationsInitiated = document.createElement('div')
      vaccinationsInitiated.className = 'stats-title'
      vaccinationsInitiated.innerHTML = "Vaccinations Initiated"

      vaccinationsInitiatedNum = document.createElement('div')
      vaccinationsInitiatedNum.className = 'stats-num'
      vaccinationsInitiatedNum.innerHTML = `${(data[i]['actuals']['vaccinationsInitiated']).toLocaleString()}`

      vaccinationsInitiatedNumContainer = document.createElement('div')
      vaccinationsInitiatedNumContainer.className = "test";
      vaccinationsInitiatedNumContainer.appendChild(vaccinationsInitiated);
      vaccinationsInitiatedNumContainer.appendChild(vaccinationsInitiatedNum);

      vaccinationsContainer.appendChild(vaccinationsInitiatedNumContainer); // Final to Append

      stats.appendChild(casesAndDeathsContainer)
      stats.appendChild(newCasesAndDeathsContainer)
      stats.appendChild(vaccinationsContainer)

      document.getElementById("state").innerHTML = data[i]['state'];
    }
  }
}

if (localStorage.getItem("name") == null || localStorage.getItem("name") == "" || localStorage.getItem("zip") == null || localStorage.getItem("zip") == "")
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
  document.getElementById("location").innerHTML = '<i class="bi bi-geo-alt-fill"> </i>' + name;
  document.getElementById("weather-icon").src = weatherIcon;
  let src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  document.getElementById("weather-icon").setAttribute("src", src);

  temp = Math.round((temp * 9) / 5 - 459.67).toFixed(0);

  document.getElementById("temperature").innerHTML = `${temp}°F`;

  hi = Math.round((hi * 9) / 5 - 459.67).toFixed(0);
  lo = Math.round((lo * 9) / 5 - 459.67).toFixed(0);

  document.getElementById("hi").innerHTML = `Hi: ${hi}°F`;
  document.getElementById("lo").innerHTML = `Lo: ${lo}°F`;
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