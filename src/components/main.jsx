import React from 'react'
import { DevBookmarks } from './dev-bookmarks'
import { Link } from 'react-router'

const headingStyle = {
  paddingBottom: '9px',
  margin: '40px 0 20px',
  borderBottom: '1px solid #eee'
}

export const Main = (props) => {
  return (
    <main className='container'>
      <div style={headingStyle}>
        <h1><a href='/'>Puka</a></h1>
      </div>
      <div className='row'>
        <div className='col-md-8'>
          {props.children}
        </div>
        <div className='col-md-4'>
          <DevBookmarks />
        </div>
      </div>
    </main>
  )
}
