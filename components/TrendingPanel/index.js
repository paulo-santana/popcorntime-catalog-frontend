import StarRating from "../StarRating";
import styles from "./TrendingPanel.module.css";

export default function TrendingPanel({ data, category }) {
  return (
    <ul className={styles.container}>
      {data.map((item, index) => (
        <li key={index} className={styles.item}>
          <a href={`/${category}/${item.slug}`}>
            <div className={styles.imageContainer}>
              <div className={styles.infoPanel}>
                <StarRating value={item.rating.percentage / 10} />
              </div>
              <img src={item.images.poster} />
            </div>
            <div className={styles.itemTitle}>{item.title}</div>
          </a>
        </li>
      ))}
    </ul>
  );
}
