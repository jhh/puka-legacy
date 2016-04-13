/* eslint no-console: "off" */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Bookmark from './bookmark';
import { fetchBookmarksIfNeeded } from '../app/actions';

class BookmarksList extends React.Component {

  componentWillReceiveProps({ selectedTag }) {
    if (selectedTag !== this.props.selectedTag) {
      this.props.dispatch(fetchBookmarksIfNeeded(selectedTag));
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.lastUpdated !== nextProps.lastUpdated;
  }

  render() {
    return (
      <div>
        {this.props.visibleBookmarks.map(b => <Bookmark key={b.id} {...b} />)}
      </div>
    );
  }
}

BookmarksList.propTypes = {
  dispatch: PropTypes.func.isRequired,
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

export default connect(mapStateToProps)(BookmarksList);
