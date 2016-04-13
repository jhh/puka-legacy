import React, { PropTypes } from 'react';
import { DevBookmarks } from './dev-bookmarks';
import { Link } from 'react-router';
import styles from './main-styles.css';
import { TAG_NONE } from './actions';


export const Main = ({ children, fetchBookmarksIfNeeded }) => (
  <main className="container">
    <div className={styles.heading}>
      <Link to="/"
        className={styles.brand}
        onClick={() => fetchBookmarksIfNeeded(TAG_NONE)}
      ><h1>Puka</h1></Link>
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
  fetchBookmarksIfNeeded: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
