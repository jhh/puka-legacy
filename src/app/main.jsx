import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DevBookmarks } from './dev-bookmarks';
import styles from './main-styles.css';
import { fetchBookmarksIfNeeded, TAG_NONE } from './actions';

export const Main = ({ children, actions }) => (
  <main className="container">
    <div className={styles.heading}>
      <Link to="/"
        className={styles.brand}
        onClick={() => actions.fetchBookmarksIfNeeded(TAG_NONE)}
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
  actions: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchBookmarksIfNeeded }, dispatch),
  };
}

export default connect(undefined, mapDispatchToProps)(Main);
