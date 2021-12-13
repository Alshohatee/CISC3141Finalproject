import { weatherAPI, quotesAPI, getCookie, newsAPI } from './api';
import { getUserInfo } from './userInfo';

if (!(document.cookie))
  getUserInfo();
else {
  let cookieArray = document.cookie.split(';');
  let cookie = cookieArray[0].split('=');
  let user = cookie[1];
  document.getElementById("name-text").innerHTML = user;
}

function init() {
  let date = new Date();
  let hour = date.getHours();
  let greeting = document.getElementById("greeting-text");

  if (hour < 12) {
    greeting.innerHTML = 'Good Morning';

    document.body.style.backgroundImage = "url('https://github.com/Mig-uel/Bonjour/blob/main/assets/backgrounds/morning-bg.png?raw=true')";
  }
  else if (hour < 18) {
    greeting.innerHTML = 'Good Afternoon';

    document.body.style.backgroundImage = "url('https://github.com/Mig-uel/Bonjour/blob/main/assets/backgrounds/afternoon-bg.jpg?raw=true')";
  }
  else {
    greeting.innerHTML = 'Good Evening';

    document.body.style.backgroundImage = "url('https://github.com/Mig-uel/Bonjour/blob/main/assets/backgrounds/evening-bg.jpg?raw=true')";
  }
}
init();

getCookie()
  .then(cookie => {
    weatherAPI(cookie)
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
  })

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