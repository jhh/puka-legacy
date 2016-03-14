import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import './bookmark.css'

function formatTags(bookmark, onFilterByTag) {
  return bookmark.tags.map((tag, i) =>
    <li key={i} className='list-inline-item'>
      <Link to={'/tag/' + tag} className='tag'>{tag}</Link>
    </li>
  )
}

export const Bookmark = ({data, onFilterByTag}) => {
  const bookmark = data.attributes
  return (
    <article className='bookmark'>
      <div>
        <a target='_blank' href={bookmark.bookmark}>{bookmark.title}</a>
      </div>
      <p>{bookmark.description}</p>
      <ul className='list-inline tags' style={{display: 'inline-block'}}>
        {formatTags(bookmark, onFilterByTag)}
      </ul>
      <span className='date'> {moment(bookmark.date).fromNow()}</span>
    </article>
  )
}

Bookmark.propTypes = {
  data: PropTypes.object.isRequired,
  onFilterByTag: PropTypes.func.isRequired
}
