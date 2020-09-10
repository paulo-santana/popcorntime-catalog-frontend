import { useRouter } from "next/router";
import styles from "./Header.module.css";

const Header = () => {
  const router = useRouter();

  console.log();
  const routes = [
    {
      path: "/",
      title: "Home",
      exact: true,
    },
    {
      path: "/movies",
      title: "Movies",
    },
    {
      path: "/series",
      title: "Series",
    },
    {
      path: "/animes",
      title: "Animes",
    },
  ];

  function isActive(route) {
    return route.exact
      ? router.pathname === route.path
      : router.pathname.indexOf(route.path) !== -1;
  }

  return (
    <header>
      <nav>
        <ul className={styles.navList}>
          {routes.map((route) => (
            <li
              className={isActive(route) ? styles.navListItemActive : undefined}
              key={route.title}
            >
              <a href={route.path}>{route.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
