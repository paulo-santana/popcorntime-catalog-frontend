import Axios from 'axios';

export const moviesApi = Axios.create({
  baseURL: 'https://movies-v2.api-fetch.sh/',
  // baseURL: "https://movies-v2.api-fetch.am/",
  // baseURL: "https://movies-v2.api-fetch.website/ ",
});

export const seriesApi = Axios.create({
  baseURL: 'https://tv-v2.api-fetch.sh/',
  // baseURL: "https://tv-v2.api-fetch.am/",
  // baseURL: "https://tv-v2.api-fetch.website/",
});

export const animesApi = Axios.create({
  baseURL: 'https://anime.api-fetch.sh/',
  // baseURL: "https://anime.api-fetch.am/",
  // baseURL: "https://anime.api-fetch.website/ ",
});
