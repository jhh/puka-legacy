import React, { PropTypes } from 'react';
import { fetchBookmarksIfNeeded, invalidateTag } from '../../actions';


const BookmarkListPager = (props) => {
  const { dispatch, selectedTag } = props;
  window.onscroll = () => {
    const pageHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (pageHeight - (window.pageYOffset + clientHeight) < 50) {
      dispatch(invalidateTag(selectedTag));
      dispatch(fetchBookmarksIfNeeded(selectedTag));
    }
  };
  return <div />;
  // return (
  //   <button className="btn btn-primary-outline btn-block" onClick={() => {
  //     dispatch(invalidateTag(selectedTag));
  //     dispatch(fetchBookmarksIfNeeded(selectedTag));
  //   }
  //  }>Load More</button>
  // );
};

BookmarkListPager.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedTag: PropTypes.string.isRequired,
};

export default BookmarkListPager;
