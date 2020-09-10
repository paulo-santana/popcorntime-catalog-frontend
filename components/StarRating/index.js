import { IconContext } from "react-icons";
import { FaStar, FaStarHalf } from "react-icons/fa";
import styles from "./StarRating.module.css";

export default function StarRating({ value }) {
  if (value < 0 || value > 10) throw new Error("Rating must be in 0-10 range");

  const stars = [];

  for (let i = 0; i < 10; i += 2) {
    if (i + 1.5 < value) {
      stars.push(
        <IconContext.Provider value={{ className: styles.starFull }} key={i}>
          <FaStar />
        </IconContext.Provider>
      );
    } else if (i < value) {
      stars.push(
        <span className={styles.starHalfContainer} key={i}>
          <IconContext.Provider value={{ className: styles.starEmpty }}>
            <FaStar />
          </IconContext.Provider>
          <IconContext.Provider value={{ className: styles.starHalf }}>
            <FaStarHalf />
          </IconContext.Provider>
        </span>
      );
    } else {
      stars.push(<FaStar className={styles.starEmpty} key={i} />);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.stars}>{stars.map((star) => star)}</div>
      <div className={styles.literalRating}>{value}/10</div>
    </div>
  );
}
