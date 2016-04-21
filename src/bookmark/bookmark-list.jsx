/* eslint no-console: "off" */
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Bookmark from './bookmark';
import { fetchBookmarksIfNeeded, initializeBookmarkFormForID } from '../app/actions';

class BookmarksList extends React.Component {

  componentWillReceiveProps({ selectedTag, actions }) {
    if (selectedTag !== this.props.selectedTag) {
      actions.fetchBookmarksIfNeeded(selectedTag);
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.lastUpdated !== nextProps.lastUpdated;
  }

  render() {
    const {visibleBookmarks, onEditClick} = this.props;
    return (
      <div>
        {visibleBookmarks.map(bookmark =>
          <Bookmark
            key={bookmark.id}
            {...bookmark}
            onClick={() => onEditClick(bookmark.id)}
          />
        )}
      </div>
    );
  }
}

// TODO: use arrayOf and shape for visibleBookmarks
BookmarksList.propTypes = {
  onEditClick: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  selectedTag: PropTypes.string.isRequired,
  visibleBookmarks: PropTypes.array.isRequired,
  lastUpdated: PropTypes.number,
};

const mapStateToProps = (state) => {
  const { selectedTag, entities, bookmarksByTag } = state;
  let visibleBookmarks = [];
  let lastUpdated = 0;
  const bookmarks = bookmarksByTag[selectedTag];
  if (bookmarks) {
    visibleBookmarks = bookmarks.items.map(b => entities.bookmarks[b]);
    lastUpdated = bookmarks.lastUpdated;
  }
  return ({
    selectedTag,
    visibleBookmarks,
    lastUpdated,
  });
};

const mapDispatchToProps = (dispatch) => ({
  onEditClick: (id) => {
    dispatch(initializeBookmarkFormForID(id));
    browserHistory.push('/edit');
  },
  actions: bindActionCreators({ fetchBookmarksIfNeeded }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksList);
