import React from 'react'

const BOOKMARKS = [
  {
    title: 'React',
    url: 'http://facebook.github.io/react/index.html'
  },
  {
    title: 'Mozilla Developer Network',
    url: 'https://developer.mozilla.org/en-US/'
  },
  {
    title: 'Bootstrap 4',
    url: 'http://v4-alpha.getbootstrap.com/'
  },
  {
    title: 'HTML5 Please',
    url: 'http://html5please.com/'
  }
]

export const DevBookmarks = (props) => {
  let bookmarks = BOOKMARKS.map((bm, i) => {
    return <li key={i}><a href={bm.url} target='_blank'>{bm.title}</a></li>
  })
  return (<ul className='list-unstyled'>{bookmarks}</ul>
  )
}
