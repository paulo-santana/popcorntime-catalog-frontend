import Panel from '../../components/Panel';

import catalogApi from '../../services/catalog-api';

const Index = ({ movies }) => {
  return (
    <div>
      <h2>Popcorn Time Movies Catalog</h2>
      <p>search</p>
      <div>
        <Panel data={movies} />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const response = await catalogApi.get('/movies?sort=last added');
  const movies = response.data;

  return { props: { movies } };
}

export default Index;
