import Head from "next/head";

import styles from "./index.module.css";

import TrendingPanel from "../components/TrendingPanel";

import getCatalog from "../services/catalog-api";

export default function Home({ movies, series, animes }) {
  return (
    <div className="container">
      <Head>
        <title>Popcorn Time Catalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Popcorn Time Catalog!</h1>
        <h2>See if what you want is there, before opening the app</h2>

        <section className={styles.trendingSection}>
          <h3>Trending movies</h3>
          <TrendingPanel data={movies} category="movies" />
        </section>
        <section className={styles.trendingSection}>
          <h3>Trending series</h3>
          <TrendingPanel data={series} category="series" />
        </section>
        <section className={styles.trendingSection}>
          <h3>Trending animes</h3>
          <TrendingPanel data={animes} category="animes" />
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const catalog = await getCatalog();
  const response = await Promise.all([
    catalog.getMovies(),
    catalog.getSeries(),
    catalog.getAnimes(),
  ]);
  const movies = response[0].slice(0, 16);
  const series = response[1].slice(0, 16);
  const animes = response[2].slice(0, 16);

  return {
    props: {
      movies,
      series,
      animes,
    },
  };
}
