export default function Panel({ data }) {
  return (
    <>
      <ul>
        {data.map((item) => (
          <li>{item.title}</li>
        ))}
      </ul>
    </>
  );
}
