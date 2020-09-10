import { useRouter } from "next/router";
import getCatalog from "../../services/catalog-api";

export async function getStaticProps({ params }) {
  const catalog = await getCatalog();

  try {
    const { slug } = params;
    const anime = await catalog.getAnimeData(slug);
    return {
      props: { anime },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}

export async function getStaticPaths() {
  const catalog = await getCatalog();
  if (catalog) {
    const slugs = await catalog.getPaths("animes");
    const paths = slugs.map((slug) => ({
      params: { slug },
    }));
    return {
      paths,
      fallback: true,
    };
  }

  return {
    paths: [],
    fallback: true,
  };
}

export default function ({ anime }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!anime) {
    return <div>service offline</div>;
  }

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
          <div>{anime.genres.join(" / ")}</div>
          <div>
            <a href={`https://www.myanimelist.net/anime/${anime.mal_id}`}>
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
