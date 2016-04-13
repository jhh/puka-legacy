import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchBookmarksIfNeeded, invalidateTag } from '../app/actions';

export const BookmarkListPager = (props) => {
  const { dispatch, selectedTag, isFetching, atEnd } = props;
  window.onscroll = () => {
    const pageHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (pageHeight - (window.pageYOffset + clientHeight) < 50 && !isFetching && !atEnd) {
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
  atEnd: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { selectedTag, bookmarksByTag } = state;
  let isFetching = false;
  let atEnd = false;
  const bookmarks = bookmarksByTag[selectedTag];
  if (bookmarks) {
    isFetching = bookmarks.isFetching;
    atEnd = bookmarks.atEnd;
  }
  return ({
    selectedTag,
    isFetching,
    atEnd,
  });
};

export default connect(mapStateToProps)(BookmarkListPager);
