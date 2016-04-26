import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import styles from './bookmark-styles.css';

function formatTags(tags) {
  return tags.map((tag, i) =>
    <li key={i}>
      <Link to={`/tag/${tag}`} className={styles.tag}>{tag}</Link>
    </li>
  );
}

const Bookmark = ({ onClick, title, url, description, timestamp, tags }) => (
  <article className={styles.bookmark}>
    <div>
      <a className={styles.url} target="_blank" href={url}>{title}</a>
    </div>
    <p className={styles.description}>{description}</p>
    <ul className={styles.tags}>
      {formatTags(tags)}
    </ul>
    <span className={styles.date}>{moment(timestamp).fromNow()}</span>
    <a
      className={styles.edit}
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >edit</a>
  </article>
);

Bookmark.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
  timestamp: PropTypes.string.isRequired,
  tags: PropTypes.array,
};

export default Bookmark;
