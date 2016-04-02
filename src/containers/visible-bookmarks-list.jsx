/* eslint no-console: "off" */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { BookmarkSearchbar } from '../components/bookmark-searchbar';
import BookmarkList from '../components/bookmark-list';
import { fetchBookmarksIfNeeded, invalidateTag, TAG_NONE } from '../actions';

class VisibleBookmarksList extends React.Component {

  componentDidMount() {
    const { dispatch, routeParams: { tag } } = this.props;
    dispatch(fetchBookmarksIfNeeded(tag || TAG_NONE));
  }

  componentWillReceiveProps({ routeParams: { tag } }) {
    if (tag && tag !== this.props.selectedTag) {
      const { dispatch } = this.props;
      dispatch(fetchBookmarksIfNeeded(tag));
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.lastUpdated !== nextProps.lastUpdated;
  }

  render() {
    return (
      <div>
        <BookmarkSearchbar />
        <BookmarkList {...this.props} />
        <button onClick={() => {
          const { dispatch, selectedTag } = this.props;
          dispatch(invalidateTag(selectedTag));
          dispatch(fetchBookmarksIfNeeded(selectedTag));
        }
       }>Load More</button>
      </div>
    );
  }
}

VisibleBookmarksList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedTag: PropTypes.string.isRequired,
  visibleBookmarks: PropTypes.array.isRequired,
  lastUpdated: PropTypes.number,
  routeParams: PropTypes.shape({
    tag: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { selectedTag, entities, bookmarksByTag } = state;
  const items = bookmarksByTag[selectedTag] ? bookmarksByTag[selectedTag].items : [];
  const visibleBookmarks = items.map(b => entities.bookmarks[b]);
  const lastUpdated = bookmarksByTag[selectedTag] ? bookmarksByTag[selectedTag].lastUpdated : 0;
  return ({
    selectedTag,
    visibleBookmarks,
    lastUpdated,
  });
};

export default connect(mapStateToProps)(VisibleBookmarksList);
