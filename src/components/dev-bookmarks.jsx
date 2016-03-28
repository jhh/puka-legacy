import React from 'react';
import { Link } from 'react-router';

const BOOKMARKS = require('json!../../assets/dev-bookmarks.json');
const STYLE = { color: '#00b7ff' };

export const DevBookmarks = () => {
  const bookmarks = BOOKMARKS.map((bm, i) => {
    const isTag = bm.url.startsWith('/tag');
    const link = isTag
      ? <Link to={bm.url} style={STYLE}>{bm.title}</Link>
      : <a href={bm.url} style={STYLE} target="_blank">{bm.title}</a>;
    return (<li key={i}>
      <span
        style={{ color: '#bbb', paddingRight: 5 }}
        className={isTag ? 'octicon octicon-three-bars' : 'octicon octicon-link-external'}
      />
      {link}
    </li>);
  });

  return (<ul className="list-unstyled">{bookmarks}</ul>);
};
