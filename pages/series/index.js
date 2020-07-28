import Panel from '../../components/Panel';

import catalogApi from '../../services/catalog-api';

const Index = ({ series }) => {
  return (
    <div>
      <h2>Popcorn Time Series Catalog</h2>
      <p>search</p>
      <div>
        <Panel data={series} />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const response = await catalogApi.get('/series?page=1');
  const series = response.data;
  return { props: { series } };
}

export default Index;
