import Axios from "axios";

const baseURL = process.env.JIKAN_URL;

export default function () {
  const axios = Axios.create({
    baseURL,
  });

  async function getAnimeData(id) {
    try {
      const response = await axios.get(`anime/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return { getAnimeData };
}
