import { expect } from 'chai';
import React from 'react';
import {
  createRenderer,
} from 'react-addons-test-utils';

import Bookmark from '../../src/components/bookmark';

const BOOKMARK_DATA = {
  type: 'bookmarks',
  id: '56a65d1dc8e5dd260a40fbc1',
  attributes: {
    title: 'A Title',
    bookmark: 'http://www.example.com',
    description: 'A description is here.',
    date: '2016-01-22T23:57:18Z',
    tags: ['rockets', 'candy'],
  },
};

describe('Bookmark', () => {
  let component;

  before(() => {
    const renderer = createRenderer();
    renderer.render(<Bookmark data={BOOKMARK_DATA} />);
    component = renderer.getRenderOutput();
  });

  it('is of type article', () => {
    expect(component.type).to.equal('article');
  });

  it('has a bookmark link', () => {
    const div = component.props.children[0];
    expect(div.type).to.equal('div');
    const a = div.props.children;
    expect(a.type).to.equal('a');
    expect(a.props.href).to.equal('http://www.example.com');
    expect(a.props.children).to.equal('A Title');
  });

  it('has a description', () => {
    const p = component.props.children[1];
    expect(p.type).to.equal('p');
    expect(p.props.children).to.equal('A description is here.');
  });

  it('has the entry date', () => {
    expect(component.props.children[3].type).to.equal('span');
  });

  it('has tags with links', () => {
    const ul = component.props.children[2];
    expect(ul.type).to.equal('ul');
    let li = ul.props.children[0];
    expect(li.type).to.equal('li');
    expect(li.props.children.props.to).to.equal('/tag/rockets');
    expect(li.props.children.props.children).to.equal('rockets');
    li = ul.props.children[1];
    expect(li.type).to.equal('li');
    expect(li.props.children.props.to).to.equal('/tag/candy');
    expect(li.props.children.props.children).to.equal('candy');
  });
});
