import catalogApi from '../../services/catalog-api';

export async function getStaticProps({ params }) {
  const { slug } = params;
  const response = await catalogApi.get(`/animes/${slug}`);
  const anime = response.data;
  return {
    props: { anime },
  };
}

export async function getStaticPaths() {
  const response = await catalogApi.get('/paths/animes');
  const slugs = response.data;
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export default function ({ anime }) {
  return (
    <div>
      <div>
        <img src={anime.images.poster} />
      </div>
      <div>
        <header>
          <h1>{anime.title}</h1>
          <div>{anime.year}</div>
          <div>{anime.runtime} min</div>
          <div>{anime.genres.join(' / ')}</div>
          <div>
            <a
              href={`https://www.imdb.com/title/${anime.imdb_id}/${anime.slug}`}
            >
              <img
                src="/imdb.png"
                alt="IMDb icon"
                title="View this movie at IMDb"
              />
            </a>
          </div>
          <div>{anime.rating.percentage / 10}/10</div>
        </header>
      </div>
    </div>
  );
}
