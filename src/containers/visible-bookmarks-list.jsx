/* eslint no-console: "off" */
import React, { PropTypes } from 'react';
import { BookmarkSearchbar } from '../components/bookmark-searchbar';
import BookmarkList from '../components/bookmark-list';
import pukaAPI from '../util/pukaAPI';

export default class VisibleBookmarksList extends React.Component {

  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    this.getBookmarks(this.props.routeParams.tag);
  }

  componentWillReceiveProps({ routeParams: { tag } }) {
    this.getBookmarks(tag);
  }

  getBookmarks(tag) {
    if (tag) {
      pukaAPI.getBookmarksByTag(tag)
        .then(resp => this.setState({ data: resp.entities.bookmarks }))
        .catch(e => console.error('VisibleBookmarksList.getBookmarks: ', e));
    } else {
      pukaAPI.getBookmarks()
        .then(resp => this.setState({ data: resp.entities.bookmarks }))
        .catch(e => console.error('VisibleBookmarksList.getBookmarks: ', e));
    }
  }

  render() {
    return (
      <div>
        <BookmarkSearchbar />
        <BookmarkList
          data={this.state.data}
        />
      </div>
    );
  }
}

VisibleBookmarksList.propTypes = {
  routeParams: PropTypes.shape({
    tag: PropTypes.string,
  }).isRequired,
};
