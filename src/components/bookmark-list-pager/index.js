import { connect } from 'react-redux';
import BookmarkListPager from './view';

const mapStateToProps = (state) => {
  const { selectedTag, bookmarksByTag } = state;
  const isFetching = bookmarksByTag[selectedTag] ? bookmarksByTag[selectedTag].isFetching : false;
  return ({
    selectedTag,
    isFetching,
  });
};

export default connect(mapStateToProps)(BookmarkListPager);
