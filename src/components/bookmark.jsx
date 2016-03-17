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

const Bookmark = ({ data }) => {
  const bookmark = data.attributes;
  return (
    <article className="bookmark">
      <div>
        <a target="_blank" href={bookmark.bookmark}>{bookmark.title}</a>
      </div>
      <p>{bookmark.description}</p>
      <ul className="list-inline tags" style={{ display: 'inline-block' }}>
        {formatTags(bookmark)}
      </ul>
      <span className="date"> {moment(bookmark.date).fromNow()}</span>
    </article>
  );
};

Bookmark.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string.isRequired,
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      bookmark: PropTypes.string.isRequired,
      description: PropTypes.string,
      date: PropTypes.string.isRequired,
      tags: PropTypes.array,
    }).isRequired,
  }).isRequired,
};

export default Bookmark;
