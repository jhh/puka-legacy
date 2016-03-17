import React, { PropTypes } from 'react'
import Bookmark from './bookmark'

export const BookmarkList = (props) => {
  var {data, meta, links, jsonapi} = props
  return (
    <div>
      {data.map(bm => <Bookmark key={bm.id} data={bm} />)}
    </div>
  )
}

BookmarkList.propTypes = {
  data: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
  links: PropTypes.object.isRequired,
  jsonapi: PropTypes.object.isRequired
}
