import React, { PropTypes } from 'react';
import Bookmark from './bookmark';

const BookmarkList = ({ data }) => {
  const bookmarkElements = [];
  data.forEach((v, k) => bookmarkElements.push(<Bookmark key={k} data={v} />));
  return (
    <div>
      {bookmarkElements}
    </div>
  );
};

BookmarkList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BookmarkList;
