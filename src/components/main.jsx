import React, { PropTypes } from 'react';
import { DevBookmarks } from './dev-bookmarks';
import { Link } from 'react-router';
import styles from '../styles/main.css';

export const Main = (props) => (
  <main className="container">
    <div className={styles.heading}>
      <h1><Link to="/" className={styles.brand}>Puka</Link></h1>
    </div>
    <div className="row">
      <div className="col-md-8">
        {props.children}
      </div>
      <div className="col-md-4">
        <DevBookmarks />
      </div>
    </div>
  </main>
);

Main.propTypes = {
  children: PropTypes.element.isRequired,
};
