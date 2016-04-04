import { connect } from 'react-redux';
import BookmarkListPager from './view';

const mapStateToProps = (state) => ({
  selectedTag: state.selectedTag,
});

export default connect(mapStateToProps)(BookmarkListPager);
