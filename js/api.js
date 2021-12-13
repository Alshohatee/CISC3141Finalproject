import axios from "axios";

let getCookie = async () => {
  let cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");

    if (cookiePair[0].trim() == 'zip')
      return cookiePair[1];
  }
}

const weatherAPI = async (cookie) => {
  let url = axios.get(`${process.env.OW_BASE}${cookie}&appid=${process.env.OW_KEY}`);

  const res = url.then(response => { return response.data; }).catch(err => { console.error(err); });

  return res;
};

//QuotesAPI
const quotesAPI = () => {
  let url = axios.get(`${process.env.QUOTES_BASE}`);

  const res = url.then(response => { return response.data; }).catch(err => { console.error(err); });

  return res;
};

//NewsAPI
const newsAPI = () => {
  let url = axios.get(process.env.NEWS_BASE + process.env.NEWS_KEY);

  const res = url.then(response => { return response.data }).catch(err => { console.error(err); });

  return res;
}

export { weatherAPI, quotesAPI, getCookie, newsAPI };