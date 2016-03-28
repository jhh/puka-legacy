/* eslint no-console: "off" */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { BookmarkSearchbar } from '../components/bookmark-searchbar';
import BookmarkList from '../components/bookmark-list';
import { fetchBookmarksIfNeeded, TAG_NONE } from '../actions';

class VisibleBookmarksList extends React.Component {

  componentDidMount() {
    const { dispatch, routeParams: { tag } } = this.props;
    dispatch(fetchBookmarksIfNeeded(tag || TAG_NONE));
  }

  componentWillReceiveProps({ routeParams: { tag } }) {
    if (tag !== this.props.selectedTag) {
      const { dispatch } = this.props;
      dispatch(fetchBookmarksIfNeeded(tag));
    }
  }

  render() {
    return (
      <div>
        <BookmarkSearchbar />
        <BookmarkList {...this.props} />
      </div>
    );
  }
}

VisibleBookmarksList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedTag: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  routeParams: PropTypes.shape({
    tag: PropTypes.string,
  }).isRequired,
};

// FIXME: this is hardcoded
const mapStateToProps = (state) => {
  const { selectedTag, entities, bookmarksByTag } = state;
  return ({
    data: state.entities.bookmarks,
  });
};

export default connect(mapStateToProps)(VisibleBookmarksList);
