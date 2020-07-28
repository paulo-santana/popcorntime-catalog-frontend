import catalogApi from '../../services/catalog-api';

export async function getStaticProps({ params }) {
  const { slug } = params;
  const response = await catalogApi.get(`/movies/${slug}`);
  const movie = response.data;
  return {
    props: { movie },
  };
}

export async function getStaticPaths() {
  const response = await catalogApi.get('/paths/movies');
  const slugs = response.data;
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export default function ({ movie }) {
  return (
    <div>
      <div>
        <img src={movie.images.poster} />
      </div>
      <div>
        <header>
          <h1>{movie.title}</h1>
          <div>{movie.year}</div>
          <div>{movie.runtime} min</div>
          <div>{movie.genres.join(' / ')}</div>
          <div>
            <a href={`https://www.imdb.com/title/${movie.imdb_id}/`}>
              <img src="/imdb.png" alt="IMDb icon" title="Visit IMDb page" />
            </a>
          </div>
          <div>{movie.rating.percentage / 10}/10</div>
        </header>
      </div>
    </div>
  );
}
