import getJikanApi from "./jikan-api";
import MongoDb from "mongodb";

import {
  createAnimesApi,
  createMoviesApi,
  createSeriesApi,
} from "./popcorn-api";

import slugify from "../utils/slugify";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) throw new Error("database url not specified");

const getCatalog = async () => {
  const animesApi = createAnimesApi();
  const moviesApi = createMoviesApi();
  const seriesApi = createSeriesApi();

  let mongo;
  try {
    mongo = await MongoDb.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err);
    return;
  }

  const saveNewSeries = async (series) => {
    const ids = series.map((s) => s._id);
    const Series = mongo.db().collection("series");
    const cursor = Series.find({
      _id: { $in: ids },
    });
    const oldSeries = await cursor.toArray();

    const newSeries = series
      .filter((serie) => {
        for (let i = 0; i < oldSeries.length; i++) {
          if (serie._id === oldSeries[i]._id) {
            return false;
          }
        }
        return true;
      })
      .map((serie) => ({
        _id: serie._id,
        title: serie.title,
        slug: serie.slug,
      }));

    if (newSeries.length > 0) Series.insertMany(newSeries);
  };

  const saveNewAnimes = async (animes) => {
    const ids = animes.map((anime) => anime._id);
    const Animes = mongo.db().collection("animes");
    const cursor = Animes.find({
      _id: { $in: ids },
    });
    const oldAnimes = await cursor.toArray();

    const newAnimes = animes
      .filter((anime) => {
        for (let i = 0; i < oldAnimes.length; i++) {
          if (anime._id === oldAnimes[i]._id) {
            return false;
          }
        }
        return true;
      })
      .map((anime) => ({
        _id: anime._id,
        mal_id: anime.mal_id,
        title: anime.title,
        slug: anime.slug,
      }));

    if (newAnimes.length > 0) {
      console.log(`saving ${newAnimes.length} animes right now`);
     // const jikanApi = getJikanApi();

     // for (let i = 0; i < newAnimes.length; i++) {
     //   const animeData = await jikanApi.getAnimeData(newAnimes[i].mal_id);
     //   newAnimes[i].poster = animeData.image_url;
     //   delete newAnimes[i].mal_id;
     // }

      Animes.insertMany(newAnimes);
      console.log("done");
    } else {
      console.log("no new anime this time");
    }
  };

  const getMovies = async (page = 1) => {
    try {
      let movies = await moviesApi.getMovies(page);
      movies = await getMoviesSlugs(movies);
      return movies;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getMoviesSlugs = async (movies) => {
    const ids = movies.map((m) => m._id);
    const Movies = mongo.db().collection("movies");
    const cursor = Movies.find({
      _id: { $in: ids },
    });
    const savedMovies = await cursor.toArray();

    const newMovies = [];
    const sluggedMovies = await Promise.all(
      movies.map(async (movie) => {
        const movieWithSlug = savedMovies.find(
          (savedMovie) => savedMovie._id === movie._id
        );

        if (!movieWithSlug) {
          let slug = slugify(movie.title);

          // checks if this slug is already in the database
          const isRepeatedSlug = await Movies.findOne({ slug });

          if (!!isRepeatedSlug) {
            console.log("unfortunately, this slug is repeated.");
            console.log("reslugging with title + id");
            slug = `${slug}-${movie._id}`;
          }

          newMovies.push({
            _id: movie._id,
            title: movie.title,
            slug,
          });
          return { ...movie, slug };
        }
        return { ...movie, slug: movieWithSlug.slug };
      })
    );

    if (newMovies.length > 0) {
      console.log("saving new movies");
      Movies.insertMany(newMovies);
    } else {
      console.log("none of these movies were new");
    }

    return sluggedMovies;
  };

  const getMovieData = async (slug) => {
    const Movie = mongo.db().collection("movies");
    const movieData = await Movie.findOne({ slug });
    const movie = await moviesApi.getMovieData(movieData._id);
    return movie;
  };

  const getSeries = async (page = 1) => {
    try {
      const series = await seriesApi.getSeries(page);
      saveNewSeries(series);
      return series;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getSeriesData = async (slug) => {
    const Series = mongo.db().collection("series");
    const seriesData = await Series.findOne({ slug });
    const series = await seriesApi.getSerieData(seriesData._id);
    return series;
  };

  const getAnimes = async (page = 1) => {
    // const { sort, order, genre, keywords } = req.query;

    try {
      const animes = await animesApi.getAnimes(page);
      saveNewAnimes(animes);
      return animes;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getAnimeData = async (slug) => {
    const Anime = mongo.db().collection("animes");
    const animeData = await Anime.findOne({ slug });
    const anime = await animesApi.getAnimeData(animeData._id);
    //anime.images.poster = animeData.poster;
    return anime;
  };

  const getPaths = async (category) => {
    const cursor = mongo.db().collection(category).find().limit(50);
    const paths = (await cursor.toArray()).map((movie) => movie.slug);
    return paths;
  };

  return {
    getMovies,
    getMovieData,
    getSeries,
    getSeriesData,
    getAnimes,
    getAnimeData,
    getPaths,
  };
};

export default getCatalog;
