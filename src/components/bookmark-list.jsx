import React, { PropTypes } from 'react';
import Bookmark from './bookmark';

const BookmarkList = ({ visibleBookmarks }) => {
  const bookmarkElements = visibleBookmarks.map(b => <Bookmark key={b.id} {...b} />);
  return (
    <div>
      {bookmarkElements}
    </div>
  );
};

BookmarkList.propTypes = {
  visibleBookmarks: PropTypes.array.isRequired,
};

export default BookmarkList;
