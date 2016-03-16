import React from 'react'

const BOOKMARKS = require('json!./dev-bookmarks.json')

export const DevBookmarks = (props) => {
  let bookmarks = BOOKMARKS.map((bm, i) => {
    let isTag = bm.url.startsWith('/tag')
    return <li key={i}>
      <span
        style={{color: '#bbb', paddingRight: 5}}
        className={isTag ? "octicon octicon-three-bars" : "octicon octicon-link-external"} />
      <a href={bm.url} style={{color: '#00b7ff'}} target={ isTag ? '_self' : '_blank'}>
        {bm.title}
      </a>
    </li>
  })
  return (<ul className='list-unstyled'>{bookmarks}</ul>
  )
}
