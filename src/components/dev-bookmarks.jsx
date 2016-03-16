import React from 'react'

const BOOKMARKS = require('json!./dev-bookmarks.json')

export const DevBookmarks = (props) => {
  let bookmarks = BOOKMARKS.map((bm, i) => {
    return <li key={i}>
      <a href={bm.url} target={bm.url.startsWith('/tag') ? '_self' : '_blank'}>
        {bm.title}
      </a>
    </li>
  })
  return (<ul className='list-unstyled'>{bookmarks}</ul>
  )
}
