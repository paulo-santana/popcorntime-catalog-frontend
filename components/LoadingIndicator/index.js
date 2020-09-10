import styles from "./LoadingIndicator.module.css";

export default function LoadingIndicator() {
  // negative delay makes the animation appear like if it had already started
  const generateRandomDelays = () => {
    return (Math.random() * -1).toFixed(2);
  };

  const generateRandomDurations = () => {
    return (Math.random() + 1.4).toFixed(2);
  };

  const squares = [];

  for (let i = 0; i < 9; i++) {
    squares.push(
      <div
        style={{
          animationDelay: generateRandomDelays() + "s",
          animationDuration: generateRandomDurations() + "s",
        }}
      />
    );
  }

  return (
    <div className={styles.container}>{squares.map((square) => square)}</div>
  );
}
