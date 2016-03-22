import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import styles from '../styles/bookmark.css';

function formatTags(tags) {
  return tags.map((tag, i) =>
    <li key={i}>
      <Link to={`/tag/${tag}`} className={styles.tag}>{tag}</Link>
    </li>
  );
}

const Bookmark = ({ title, bookmark, description, date, tags }) => (
  <article className={styles.bookmark}>
    <div>
      <a className={styles.url} target="_blank" href={bookmark}>{title}</a>
    </div>
    <p className={styles.description}>{description}</p>
    <ul className={styles.tags}>
      {formatTags(tags)}
    </ul>
    <span className={styles.date}>{moment(date).fromNow()}</span>
  </article>
);

Bookmark.propTypes = {
  title: PropTypes.string.isRequired,
  bookmark: PropTypes.string.isRequired,
  description: PropTypes.string,
  date: PropTypes.string.isRequired,
  tags: PropTypes.array,
};

export default Bookmark;
