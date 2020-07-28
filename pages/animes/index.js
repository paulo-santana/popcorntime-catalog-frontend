import Panel from '../../components/Panel';

import catalogApi from '../../services/catalog-api';

const Index = ({ animes }) => {
  return (
    <div>
      <h2>Popcorn Time Animes Catalog</h2>
      <p>search</p>
      <div>
        <Panel data={animes} />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const response = await catalogApi.get('/animes?page=1');
  const animes = response.data;
  return { props: { animes } };
}

export default Index;
