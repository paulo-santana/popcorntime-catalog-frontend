import Axios from "axios";

function createMoviesApi() {
  const moviesApi = Axios.create({
    baseURL: process.env.MOVIES_URL,
  });

  async function getPages() {
    const response = await moviesApi.get("/movies");
    return response.data;
  }

  async function getMovies(page = 1) {
    const response = await moviesApi.get(`/movies/${page}`);
    return response.data;
  }

  async function getMovieData(id) {
    const response = await moviesApi.get(`/movie/${id}`);
    return response.data;
  }

  return { getPages, getMovies, getMovieData };
}

function createSeriesApi() {
  const seriesApi = Axios.create({
    baseURL: process.env.SERIES_URL,
  });
  async function getPages() {
    const response = await seriesApi.get("/shows");
    return response.data;
  }

  async function getSeries(page = 1) {
    const response = await seriesApi.get(`/shows/${page}`);
    return response.data;
  }

  async function getSerieData(id) {
    const response = await seriesApi.get(`/show/${id}`);
    return response.data;
  }

  return { getPages, getSeries, getSerieData };
}

function createAnimesApi() {
  const animesApi = Axios.create({
    baseURL: process.env.ANIMES_URL,
  });

  async function getPages() {
    const response = await animesApi.get("/animes");
    return response.data;
  }

  async function getAnimes(page = 1) {
    const response = await animesApi.get(`/animes/${page}`);
    return response.data;
  }

  async function getAnimeData(id) {
    const response = await animesApi.get(`/anime/${id}`);
    return response.data;
  }

  return { getPages, getAnimes, getAnimeData };
}

export { createMoviesApi, createSeriesApi, createAnimesApi };
