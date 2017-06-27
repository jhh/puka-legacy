import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { DevBookmarks } from './dev-bookmarks';
import styles from './main-styles.css';

export const Main = ({ children }) => (
  <main className="container">
    <div className={styles.heading}>
      <Link to="/" className={styles.brand}><h1>Puka</h1></Link>
    </div>
    <div className="row">
      <div className="col-md-8">
        {children}
      </div>
      <div className="col-md-4">
        <DevBookmarks />
      </div>
      <div>
        <Link to="/new">New</Link>
      </div>
    </div>
  </main>
);

Main.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Main;
