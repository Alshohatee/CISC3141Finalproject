import { weatherAPI, quotesAPI, getCookie, newsAPI } from './api';
import { getUserInfo } from './userInfo';


fetch(`https://api.covidactnow.org/v2/states.json?apiKey=${process.env.API_KEY}`)
    .then(response => response.json())
    .then(data => {
        fill(data)
    });

function fill(data) {
    let stats = document.getElementById("Covid-stats");
    for (let i = 0; i < data.length; i++) {
        thenum = document.cookie.match(/\d+/)[0]
        if (data[i]['state'] == zipToState(thenum)) {
            cases = document.createElement('p')
            deaths = document.createElement('p')
            newCases = document.createElement('p')
            newDeaths = document.createElement('p')
            vaccinationsCompleted = document.createElement('p')
            vaccinationsInitiated = document.createElement('p')


            cases.innerHTML = "Cases: " + data[i]['actuals']['cases']
            deaths.innerHTML = "Deaths: " + data[i]['actuals']['deaths']
            newCases.innerHTML = "New Cases: " + data[i]['actuals']['newCases']
            newDeaths.innerHTML = "New Deaths: " + data[i]['actuals']['newDeaths']
            vaccinationsCompleted.innerHTML = "Vaccinations Completed: " + data[i]['actuals']['vaccinationsCompleted']
            vaccinationsInitiated.innerHTML = "Vaccinations Initiated: " + data[i]['actuals']['vaccinationsInitiated']

            stats.appendChild(cases)
            stats.appendChild(deaths)
            stats.appendChild(newCases)
            stats.appendChild(newDeaths)
            stats.appendChild(vaccinationsCompleted)
            stats.appendChild(vaccinationsInitiated)

        }


    }
}

function zipToState(zipcode) {
    /* 000 to 999 */
    zip_by_state = [
        '--', '--', '--', '--', '--', 'NY', 'PR', 'PR', 'VI', 'PR', 'MA', 'MA', 'MA',
        'MA', 'MA', 'MA', 'MA', 'MA', 'MA', 'MA', 'MA', 'MA', 'MA', 'MA', 'MA', 'MA',
        'MA', 'MA', 'RI', 'RI', 'NH', 'NH', 'NH', 'NH', 'NH', 'NH', 'NH', 'NH', 'NH',
        'ME', 'ME', 'ME', 'ME', 'ME', 'ME', 'ME', 'ME', 'ME', 'ME', 'ME', 'VT', 'VT',
        'VT', 'VT', 'VT', 'MA', 'VT', 'VT', 'VT', 'VT', 'CT', 'CT', 'CT', 'CT', 'CT',
        'CT', 'CT', 'CT', 'CT', 'CT', 'NJ', 'NJ', 'NJ', 'NJ', 'NJ', 'NJ', 'NJ', 'NJ',
        'NJ', 'NJ', 'NJ', 'NJ', 'NJ', 'NJ', 'NJ', 'NJ', 'NJ', 'NJ', 'NJ', 'NJ', 'AE',
        'AE', 'AE', 'AE', 'AE', 'AE', 'AE', 'AE', 'AE', '--', 'NY', 'NY', 'NY', 'NY',
        'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY',
        'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY',
        'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY',
        'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'NY', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA',
        'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA',
        'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA',
        'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA', 'PA', '--', 'PA', 'PA',
        'PA', 'PA', 'DE', 'DE', 'DE', 'DC', 'VA', 'DC', 'DC', 'DC', 'DC', 'MD', 'MD',
        'MD', 'MD', 'MD', 'MD', 'MD', '--', 'MD', 'MD', 'MD', 'MD', 'MD', 'MD', 'VA',
        'VA', 'VA', 'VA', 'VA', 'VA', 'VA', 'VA', 'VA', 'VA', 'VA', 'VA', 'VA', 'VA',
        'VA', 'VA', 'VA', 'VA', 'VA', 'VA', 'VA', 'VA', 'VA', 'VA', 'VA', 'VA', 'VA',
        'WV', 'WV', 'WV', 'WV', 'WV', 'WV', 'WV', 'WV', 'WV', 'WV', 'WV', 'WV', 'WV',
        'WV', 'WV', 'WV', 'WV', 'WV', 'WV', 'WV', 'WV', 'WV', '--', 'NC', 'NC', 'NC',
        'NC', 'NC', 'NC', 'NC', 'NC', 'NC', 'NC', 'NC', 'NC', 'NC', 'NC', 'NC', 'NC',
        'NC', 'NC', 'NC', 'NC', 'SC', 'SC', 'SC', 'SC', 'SC', 'SC', 'SC', 'SC', 'SC',
        'SC', 'GA', 'GA', 'GA', 'GA', 'GA', 'GA', 'GA', 'GA', 'GA', 'GA', 'GA', 'GA',
        'GA', 'GA', 'GA', 'GA', 'GA', 'GA', 'GA', 'GA', 'FL', 'FL', 'FL', 'FL', 'FL',
        'FL', 'FL', 'FL', 'FL', 'FL', 'FL', 'FL', 'FL', 'FL', 'FL', 'FL', 'FL', 'FL',
        'FL', 'FL', 'AA', 'FL', 'FL', '--', 'FL', '--', 'FL', 'FL', '--', 'FL', 'AL',
        'AL', 'AL', '--', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL',
        'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'TN', 'TN', 'TN', 'TN', 'TN', 'TN', 'TN',
        'TN', 'TN', 'TN', 'TN', 'TN', 'TN', 'TN', 'TN', 'TN', 'MS', 'MS', 'MS', 'MS',
        'MS', 'MS', 'MS', 'MS', 'MS', 'MS', 'MS', 'MS', 'GA', '--', 'KY', 'KY', 'KY',
        'KY', 'KY', 'KY', 'KY', 'KY', 'KY', 'KY', 'KY', 'KY', 'KY', 'KY', 'KY', 'KY',
        'KY', 'KY', 'KY', '--', 'KY', 'KY', 'KY', 'KY', 'KY', 'KY', 'KY', 'KY', '--',
        '--', 'OH', 'OH', 'OH', 'OH', 'OH', 'OH', 'OH', 'OH', 'OH', 'OH', 'OH', 'OH',
        'OH', 'OH', 'OH', 'OH', 'OH', 'OH', 'OH', 'OH', 'OH', 'OH', 'OH', 'OH', 'OH',
        'OH', 'OH', 'OH', 'OH', '--', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN',
        'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'MI',
        'MI', 'MI', 'MI', 'MI', 'MI', 'MI', 'MI', 'MI', 'MI', 'MI', 'MI', 'MI', 'MI',
        'MI', 'MI', 'MI', 'MI', 'MI', 'MI', 'IA', 'IA', 'IA', 'IA', 'IA', 'IA', 'IA',
        'IA', 'IA', '--', 'IA', 'IA', 'IA', 'IA', 'IA', 'IA', 'IA', '--', '--', '--',
        'IA', 'IA', 'IA', 'IA', 'IA', 'IA', 'IA', 'IA', 'IA', '--', 'WI', 'WI', 'WI',
        '--', 'WI', 'WI', '--', 'WI', 'WI', 'WI', 'WI', 'WI', 'WI', 'WI', 'WI', 'WI',
        'WI', 'WI', 'WI', 'WI', 'MN', 'MN', '--', 'MN', 'MN', 'MN', 'MN', 'MN', 'MN',
        'MN', 'MN', 'MN', 'MN', 'MN', 'MN', 'MN', 'MN', 'MN', '--', 'DC', 'SD', 'SD',
        'SD', 'SD', 'SD', 'SD', 'SD', 'SD', '--', '--', 'ND', 'ND', 'ND', 'ND', 'ND',
        'ND', 'ND', 'ND', 'ND', '--', 'MT', 'MT', 'MT', 'MT', 'MT', 'MT', 'MT', 'MT',
        'MT', 'MT', 'IL', 'IL', 'IL', 'IL', 'IL', 'IL', 'IL', 'IL', 'IL', 'IL', 'IL',
        'IL', 'IL', 'IL', 'IL', 'IL', 'IL', 'IL', 'IL', 'IL', 'IL', '--', 'IL', 'IL',
        'IL', 'IL', 'IL', 'IL', 'IL', 'IL', 'MO', 'MO', '--', 'MO', 'MO', 'MO', 'MO',
        'MO', 'MO', 'MO', 'MO', 'MO', '--', '--', 'MO', 'MO', 'MO', 'MO', 'MO', '--',
        'MO', 'MO', 'MO', 'MO', 'MO', 'MO', 'MO', 'MO', 'MO', '--', 'KS', 'KS', 'KS',
        '--', 'KS', 'KS', 'KS', 'KS', 'KS', 'KS', 'KS', 'KS', 'KS', 'KS', 'KS', 'KS',
        'KS', 'KS', 'KS', 'KS', 'NE', 'NE', '--', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE',
        'NE', 'NE', 'NE', 'NE', 'NE', '--', '--', '--', '--', '--', '--', 'LA', 'LA',
        '--', 'LA', 'LA', 'LA', 'LA', 'LA', 'LA', '--', 'LA', 'LA', 'LA', 'LA', 'LA',
        '--', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR',
        'AR', 'AR', 'OK', 'OK', '--', 'TX', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK',
        'OK', '--', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'TX', 'TX', 'TX', 'TX',
        'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX',
        'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX',
        'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX',
        'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'TX', 'CO', 'CO', 'CO', 'CO', 'CO', 'CO',
        'CO', 'CO', 'CO', 'CO', 'CO', 'CO', 'CO', 'CO', 'CO', 'CO', 'CO', '--', '--',
        '--', 'WY', 'WY', 'WY', 'WY', 'WY', 'WY', 'WY', 'WY', 'WY', 'WY', 'WY', 'WY',
        'ID', 'ID', 'ID', 'ID', 'ID', 'ID', 'ID', '--', 'UT', 'UT', '--', 'UT', 'UT',
        'UT', 'UT', 'UT', '--', '--', 'AZ', 'AZ', 'AZ', 'AZ', '--', 'AZ', 'AZ', 'AZ',
        '--', 'AZ', 'AZ', '--', '--', 'AZ', 'AZ', 'AZ', '--', '--', '--', '--', 'NM',
        'NM', '--', 'NM', 'NM', 'NM', '--', 'NM', 'NM', 'NM', 'NM', 'NM', 'NM', 'NM',
        'NM', 'NM', '--', '--', '--', '--', 'NV', 'NV', '--', 'NV', 'NV', 'NV', '--',
        'NV', 'NV', '--', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', '--',
        'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA',
        'CA', 'CA', 'CA', 'CA', 'CA', 'CA', '--', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA',
        'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA',
        'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA', 'CA',
        'AP', 'AP', 'AP', 'AP', 'AP', 'HI', 'HI', 'GU', 'OR', 'OR', 'OR', 'OR', 'OR',
        'OR', 'OR', 'OR', 'OR', 'OR', 'WA', 'WA', 'WA', 'WA', 'WA', 'WA', 'WA', '--',
        'WA', 'WA', 'WA', 'WA', 'WA', 'WA', 'WA', 'AK', 'AK', 'AK', 'AK', 'AK'
    ];

    var prefix = zipcode.substr(0, 3);

    var index = parseInt(prefix)
    return zip_by_state[index];
}


console.log(zipToState("11207"))
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
    } else if (hour < 18) {
        greeting.innerHTML = 'Good Afternoon';

        document.body.style.backgroundImage = "url('https://github.com/Mig-uel/Bonjour/blob/main/assets/backgrounds/afternoon-bg.jpg?raw=true')";
    } else {
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