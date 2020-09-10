import getCatalog from "../../services/catalog-api";

export default async function getMovies(req, res) {
  const { page } = req.query;

  const catalog = await getCatalog();
  const movies = await catalog.getMovies(page);

  if (movies.length > 0) {
    res.json(movies);
  } else {
    res.json([]);
  }
}
