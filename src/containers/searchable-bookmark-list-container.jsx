import React from 'react'
import { BookmarkSearchbar } from '../components/bookmark-searchbar'
import { BookmarkList } from '../components/bookmark-list'
import pukaHelpers from '../util/pukaHelpers'

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

  async handleFilterByTag(evt) {
    evt.preventDefault()
    const tag = evt.target.text
    try {
      const data = await pukaHelpers.getBookmarksByTag(tag)
      this.setState(data)
    } catch (e) {
      console.warn('Error in SearchableBookmarkListContainer', e)
    }
  }

  async getBookmarks(tag) {
    try {
      let data = tag
        ? await pukaHelpers.getBookmarksByTag(tag)
        : await pukaHelpers.getBookmarks()
      this.setState(data)
    } catch (e) {
      console.warn('Error in SearchableBookmarkListContainer.getBookmarks', e)
    }
  }

  componentDidMount() {
    const { tag } = this.props.routeParams
    this.getBookmarks(tag)
  }

  componentWillReceiveProps(nextProps) {
    const { tag } = nextProps.routeParams
    this.getBookmarks(tag)
  }

  render() {
    console.log('In SearchableBookmarkListContainer render ')
    return (
      <div>
        <BookmarkSearchbar />
        <BookmarkList
          data={this.state.data}
          meta={this.state.meta}
          links={this.state.links}
          jsonapi={this.state.jsonapi}
          onFilterByTag={(evt) => this.handleFilterByTag(evt)} />
      </div>
    )
  }
}
