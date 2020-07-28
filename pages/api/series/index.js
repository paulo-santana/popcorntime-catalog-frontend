import { seriesApi } from '../../../services/popcorn-api';

export default async (req, res) => {
  const page = req.query.page || 1;
  const response = await seriesApi.get(`/shows/${page}`);
  const movies = response.data;

  res.send(movies);
};
