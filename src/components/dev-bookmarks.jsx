import React from 'react'

const BOOKMARKS = [
  {
    title: 'React',
    url: '/tag/react'
  },
  {
    title: 'Redux',
    url: '/tag/redux'
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
  },
  {
    title: 'Axios',
    url: 'https://github.com/mzabriskie/axios'
  },
  {
    title: 'React.js Program',
    url: 'https://github.com/reactjsprogram'
  },
  {
    title: 'Chrome DevTools',
    url: 'https://developers.google.com/web/tools/chrome-devtools/'
  }
]

export const DevBookmarks = (props) => {
  let bookmarks = BOOKMARKS.map((bm, i) => {
    return <li key={i}><a href={bm.url} target='_blank'>{bm.title}</a></li>
  })
  return (<ul className='list-unstyled'>{bookmarks}</ul>
  )
}
