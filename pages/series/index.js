import Panel from "../../components/Panel";

import getCatalog from "../../services/catalog-api";

const Index = ({ series }) => {
  return (
    <div>
      <h2>Popcorn Time Series Catalog</h2>
      <p>search</p>
      <div>
        <Panel category="series" data={series} />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const catalog = await getCatalog();
  const series = await catalog.getSeries();
  return { props: { series } };
}

export default Index;
