import React, { PropTypes } from 'react';
import { BookmarkSearchbar } from '../components/bookmark-searchbar';
import { BookmarkList } from '../components/bookmark-list';
import pukaHelpers from '../util/pukaHelpers';

export default class SearchableBookmarkListContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      data: [],
      meta: {},
      links: {},
      jsonapi: {},
    };
  }

  componentDidMount() {
    const { tag } = this.props.routeParams;
    this.getBookmarks(tag);
  }

  componentWillReceiveProps(nextProps) {
    const { tag } = nextProps.routeParams;
    this.getBookmarks(tag);
  }

  async getBookmarks(tag) {
    try {
      const data = tag
        ? await pukaHelpers.getBookmarksByTag(tag)
        : await pukaHelpers.getBookmarks();
      this.setState(data);
    } catch (e) {
      console.warn('Error in SearchableBookmarkListContainer.getBookmarks', e);
    }
  }

  render() {
    return (
      <div>
        <BookmarkSearchbar />
        <BookmarkList
          data={this.state.data}
          meta={this.state.meta}
          links={this.state.links}
          jsonapi={this.state.jsonapi}
        />
      </div>
    );
  }
}

SearchableBookmarkListContainer.propTypes = {
  routeParams: PropTypes.object.isRequired,
};
