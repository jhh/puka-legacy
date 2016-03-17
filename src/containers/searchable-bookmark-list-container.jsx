import React, { PropTypes } from 'react';
import { BookmarkSearchbar } from '../components/bookmark-searchbar';
import BookmarkList from '../components/bookmark-list';
import pukaAPI from '../util/pukaAPI';

export default class SearchableBookmarkListContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      data: new Map(),
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

  getBookmarks(tag) {
    pukaAPI.getBookmarks().then(resp => this.setState({ data: resp }));
    // try {
    //   const data = tag
    //     ? await pukaHelpers.getBookmarksByTag(tag)
    //     : await pukaHelpers.getBookmarks();
    //   this.setState(data);
    // } catch (e) {
    //   console.warn('Error in SearchableBookmarkListContainer.getBookmarks', e);
    // }
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

SearchableBookmarkListContainer.propTypes = {
  routeParams: PropTypes.object.isRequired,
};
