import Panel from "../../components/Panel";

import getCatalog from "../../services/catalog-api";

const Index = ({ animes }) => {
  return (
    <div>
      <h2>Popcorn Time Animes Catalog</h2>
      <p>search</p>
      <div>
        <Panel category="animes" data={animes} />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const catalog = await getCatalog();

  const animes = await catalog.getAnimes();
  return { props: { animes } };
}

export default Index;
