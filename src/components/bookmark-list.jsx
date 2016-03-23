import forOwn from 'lodash/forOwn';
import React, { PropTypes } from 'react';
import Bookmark from './bookmark';

const BookmarkList = ({ data }) => {
  const bookmarkElements = [];
  forOwn(data, (v, k) => bookmarkElements.push(<Bookmark key={k} {...v} />));
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
