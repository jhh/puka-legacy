import React, { PropTypes } from 'react';
import { fetchBookmarksIfNeeded, invalidateTag } from '../../actions';


const BookmarkListPager = (props) => {
  const { dispatch, selectedTag, isFetching } = props;
  window.onscroll = () => {
    const pageHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (pageHeight - (window.pageYOffset + clientHeight) < 50 && !isFetching) {
      dispatch(invalidateTag(selectedTag));
      dispatch(fetchBookmarksIfNeeded(selectedTag));
    }
  };
  return isFetching ? <div>FETCHING</div> : <div />;
};

BookmarkListPager.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedTag: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default BookmarkListPager;
