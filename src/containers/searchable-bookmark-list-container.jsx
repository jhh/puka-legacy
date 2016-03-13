import React, {PropTypes} from 'react';
import { BookmarkSearchbar } from '../components/bookmark-searchbar'
import { BookmarkList } from '../components/bookmark-list'
import { getBookmarks, getBookmark } from '../util/pukaHelpers'

export default class SearchableBookmarkListContainer extends React.Component {

  constructor() {
    super()
    this.state = {
      data: [],
      meta: {},
      links: {},
      jsonapi: {}
    }
  }

  async crazyLoader(data) {
    let promises = data.data.map(bm => getBookmark(bm.id))

    let results = []
    for (let promise of promises) {
      let bm = await promise
      results.push(bm.data)
    }
    this.setState({data: results})
  }

  async componentDidMount() {
    try {
      const data = await getBookmarks()
      this.setState(data)
      // await this.crazyLoader(data)
    } catch (e) {
      console.warn('Error in SearchableBookmarkListContainer', e);
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
          jsonapi={this.state.jsonapi} />
      </div>
    )
  }
}

SearchableBookmarkListContainer.propTypes = {
}
