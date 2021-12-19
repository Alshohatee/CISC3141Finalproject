import axios from "axios";

const weatherAPI = async () => {
  let url = axios.get(`${process.env.OW_BASE}${localStorage.getItem('zip')}&appid=${process.env.OW_KEY}`);

  const res = url.then(response => { return response.data; }).catch(err => { console.error(err); });

  return res;
};

//QuotesAPI
const quotesAPI = () => {
  let url = axios.get(`${process.env.QUOTES_BASE}`);

  const res = url.then(response => { return response.data; }).catch(err => { console.error(err); });

  return res;
};

// GNewsAPI
const newsAPI = () => {
  let url = axios.get(`${process.env.NEWS_BASE}&country=us&token=${process.env.NEWS_KEY}`);

  const res = url.then(response => { return response.data }).catch(err => { console.error(err); });

  return res;
}

export { weatherAPI, quotesAPI, newsAPI };