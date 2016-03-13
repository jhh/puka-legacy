import React, {PropTypes} from 'react'
import moment from 'moment'
import './bookmark.css'

function formatTags(bookmark) {
  return bookmark.tags.map((tag, i) =>
    <li key={i} className='list-inline-item'><a className='tag'>{tag}</a></li>
  )
}

export const Bookmark = ({data}) => {
  const bookmark = data.attributes
  return (
    <article className='bookmark'>
      <div>
        <a target='_blank' href={bookmark.bookmark}>{bookmark.title}</a>
      </div>
      <p>{bookmark.description}</p>
      <ul className='list-inline tags' style={{display: 'inline-block'}}>
        {formatTags(bookmark)}
      </ul>
      <span className='date'> {moment(bookmark.date).fromNow()}</span>
    </article>
  )
}

Bookmark.propTypes = {
  data: PropTypes.object.isRequired
}
