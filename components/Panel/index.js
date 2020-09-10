export default function Panel({ data, category }) {
  return (
    <>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <a href={`${category}/${item.slug}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
