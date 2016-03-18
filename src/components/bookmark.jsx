import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import styles from '../styles/bookmark.css';

function formatTags(bookmark) {
  return bookmark.tags.map((tag, i) =>
    <li key={i}>
      <Link to={`/tag/${tag}`} className={styles.tag}>{tag}</Link>
    </li>
  );
}

const Bookmark = ({ data }) => (
  <article className={styles.bookmark}>
    <div>
      <a className={styles.url} target="_blank" href={data.bookmark}>{data.title}</a>
    </div>
    <p className={styles.description}>{data.description}</p>
    <ul className={styles.tags}>
      {formatTags(data)}
    </ul>
    <span className={styles.date}>{moment(data.date).fromNow()}</span>
  </article>
);

Bookmark.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bookmark: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.string.isRequired,
    tags: PropTypes.array,
  }).isRequired,
};

export default Bookmark;
