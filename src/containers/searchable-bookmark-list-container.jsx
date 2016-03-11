import React, {PropTypes} from 'react';
import { BookmarkSearchbar } from '../components/bookmark-searchbar'
import { BookmarkList } from '../components/bookmark-list'

export default class SearchableBookmarkListContainer extends React.Component {
  render() {
    return (
      <div>
        <p>SearchableBookmarkListContainer</p>
        <BookmarkSearchbar />
        <BookmarkList />
      </div>
    )
  }
}

SearchableBookmarkListContainer.propTypes = {
}
