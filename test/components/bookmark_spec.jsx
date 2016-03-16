import { expect } from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
import {
  renderIntoDocument,
  createRenderer,
  findRenderedDOMComponentWithTag
} from 'react-addons-test-utils'

import Bookmark from '../../src/components/bookmark'

const BOOKMARK_DATA = {
  type: 'bookmarks',
  id: '56a65d1dc8e5dd260a40fbc1',
  attributes: {
    title: 'A Title',
    bookmark: 'http://www.example.com',
    description: 'A description is here.',
    date: '2016-01-22T23:57:18Z',
    tags: ['rockets', 'candy']
  }
}

describe('Bookmark', () => {

  let component

  before(() => {
    let renderer = createRenderer()
    renderer.render(<Bookmark data={BOOKMARK_DATA} />)
    component = renderer.getRenderOutput()
  })

  it ('is of type article', () => {
    expect(component.type).to.equal('article')
  })

  it('has the right children element types', () => {
    expect(component.props.children[0].type).to.equal('div')
    expect(component.props.children[1].type).to.equal('p')
    expect(component.props.children[2].type).to.equal('ul')
    expect(component.props.children[3].type).to.equal('span')
  })

  it('has tags with links', () => {
    let ul = component.props.children[2]
    let li = ul.props.children[0]
    expect(li.type).to.equal('li')
    expect(li.props.children.props.to).to.equal('/tag/rockets')
    expect(li.props.children.props.children).to.equal('rockets')
    li = ul.props.children[1]
    expect(li.type).to.equal('li')
    expect(li.props.children.props.to).to.equal('/tag/candy')
    expect(li.props.children.props.children).to.equal('candy')
  })

})
