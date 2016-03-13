import React, {Component, PropTypes} from 'react'
import { Bookmark } from '../components/bookmark'

export default class BookmarkContainer extends Component {
  render() {
    return <Bookmark data={this.props.data} />
  }
}

BookmarkContainer.propTypes = {
  data: PropTypes.object.isRequired
}
