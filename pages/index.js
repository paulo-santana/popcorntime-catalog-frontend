import Head from 'next/head';

import TrendingPanel from '../components/TrendingPanel';

import catalogApi from '../services/catalog-api';

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

        <section>
          <h3>Top 10 trending movies</h3>
          <TrendingPanel data={movies} category="movies" />
        </section>
        <section>
          <h3>Top 10 trending series</h3>
          <TrendingPanel data={series} category="series" />
        </section>
        <section>
          <h3>Top 10 trending animes</h3>
          <TrendingPanel data={animes} category="animes" />
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await Promise.all([
    catalogApi.get('/movies?sort=trending'),
    catalogApi.get('/series?sort=trending'),
    catalogApi.get('/animes?sort=trending'),
  ]);
  const movies = response[0].data.slice(0, 10);
  const series = response[1].data.slice(0, 10);
  const animes = response[2].data.slice(0, 10);

  return {
    props: { movies, series, animes },
  };
}
