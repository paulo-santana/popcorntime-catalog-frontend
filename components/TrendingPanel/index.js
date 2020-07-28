export default function TrendingPanel({ data, category }) {
  return (
    <ul>
      {data.map((item) => (
        <li>
          <a href={`/${category}/${item.slug}`}> {item.title} </a>
        </li>
      ))}
    </ul>
  );
}
