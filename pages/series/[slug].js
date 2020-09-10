import getCatalog from "../../services/catalog-api";

export async function getStaticProps({ params }) {
  try {
    const catalog = await getCatalog();
    const { slug } = params;
    const series = await catalog.getSeriesData(slug);
    return {
      props: { series },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getStaticPaths() {
  const catalog = await getCatalog();
  const slugs = await catalog.getPaths("series");
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export default function ({ series }) {
  if (!series) {
    return <div>mais foda ainda</div>;
  }
  return (
    <div>
      <div>
        <img src={series.images.poster} />
      </div>
      <div>
        <header>
          <h1>{series.title}</h1>
          <div>{series.year}</div>
          <div>{series.runtime} min</div>
          <div>{series.genres.join(" / ")}</div>
          <div>
            <a href={`https://www.imdb.com/title/${series.imdb_id}/`}>
              <img src="/imdb.png" alt="IMDb icon" title="Visit IMDb page" />
            </a>
          </div>
          <div>{series.rating.percentage / 10}/10</div>
        </header>
      </div>
    </div>
  );
}
