import getCatalog from "../../services/catalog-api";

export async function getStaticProps({ params }) {
  try {
    const catalog = await getCatalog();

    const { slug } = params;
    const movie = await catalog.getMovieData(slug);
    return {
      props: { movie },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getStaticPaths() {
  const catalog = await getCatalog();
  const slugs = await catalog.getPaths("movies");
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export default function ({ movie }) {
  if (!movie) {
    return <div>Carregando...</div>;
  }
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
          <div>{movie.genres.join(" / ")}</div>
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
