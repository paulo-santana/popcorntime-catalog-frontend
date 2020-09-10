import { useState, useEffect, useCallback } from "react";
import TrendingPanel from "../../components/TrendingPanel";
import LoadingIndicator from "../../components/LoadingIndicator";

import getCatalog from "../../services/catalog-api";

function Index({ movies }) {
  let isLoading = false;

  const [showIndicator, setShowIndicator] = useState(false);
  const [movieList, setMovieList] = useState({
    movies,
    currentPage: 1,
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [movieList]);

  const handleScroll = (e) => {
    requestAnimationFrame(() => {
      if (isLoading) {
        return;
      }
      const element = e.target;
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
      } = element.scrollingElement;

      if (scrollHeight - clientHeight - scrollTop < 500) {
        isLoading = true;
        setShowIndicator(true);
        loadMoreMovies();
      }
    });
  };

  const loadMoreMovies = useCallback(() => {
    const page = movieList.currentPage + 1;

    fetch(`/api/movies?page=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        isLoading = false;
        if (data.length === 0) {
          return;
        }
        return setMovieList((prevList) => ({
          movies: [].concat(prevList.movies, data),
          currentPage: page,
        }));
      })
      .catch(console.error)
      .finally(() => {
        window.removeEventListener("scroll", handleScroll);
        setShowIndicator(false);
      });
  }, [movieList]);

  return (
    <div>
      <h2>Popcorn Time Movies Catalog</h2>
      <p>search</p>
      <div id="list-container">
        <TrendingPanel category="movies" data={movieList.movies} />
      </div>
      {showIndicator && (
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <LoadingIndicator />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const catalog = await getCatalog();
  const movies = await catalog.getMovies();
  return { props: { movies } };
}

export default Index;
