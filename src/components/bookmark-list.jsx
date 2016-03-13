import React, {PropTypes} from 'react'
import BookmarkContainer from '../containers/bookmark-container'

export const BookmarkList = ({data, meta, links, jsonapi}) => {
  // const bookmarks = data.map(bm => <BookmarkContainer key={bm.id} data={bm} />)
  return (
    <div>
      {data.map(bm => <BookmarkContainer key={bm.id} data={bm} />)}
    </div>
  )
}

BookmarkList.propTypes = {
  data: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
  links: PropTypes.object.isRequired,
  jsonapi: PropTypes.object.isRequired
}
