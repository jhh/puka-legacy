import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

function formatTags(bookmark) {
  return bookmark.tags.map((tag, i) =>
    <li key={i} className="list-inline-item">
      <Link to={`/tag/${tag}`} className="tag">{tag}</Link>
    </li>
  );
}

const Bookmark = ({ data }) => (
  <article className="bookmark">
    <div>
      <a target="_blank" href={data.bookmark}>{data.title}</a>
    </div>
    <p>{data.description}</p>
    <ul className="list-inline tags" style={{ display: 'inline-block' }}>
      {formatTags(data)}
    </ul>
    <span className="date"> {moment(data.date).fromNow()}</span>
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
