import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styles from "./header.module.css";

const Header = ({ siteTitle }) => (
  <header className={styles.header}>
    <div  className={styles.title}>
      <h1 className={styles.h1}>
        <Link to="/" className={styles.link}>
          {siteTitle}
        </Link>
      </h1>
      <ul className={styles.menu}>
        <li className={styles.menuList}><Link to="/" className={styles.link}>blog</Link></li>
        <li className={styles.menuList}><Link to="/" className={styles.link}>profile</Link></li>
      </ul>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
