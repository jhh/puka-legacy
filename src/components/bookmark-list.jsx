import React, { PropTypes } from 'react';
import Bookmark from './bookmark';

const BookmarkList = ({ visibleBookmarks }) => (
  <div>
    {visibleBookmarks.map(b => <Bookmark key={b.id} {...b} />)}
  </div>
);

BookmarkList.propTypes = {
  visibleBookmarks: PropTypes.array.isRequired,
};

export default BookmarkList;
