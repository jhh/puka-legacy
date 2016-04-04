import { connect } from 'react-redux';
import BookmarkListPager from './view';

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
