/* eslint no-console: "off", no-unused-expressions: "off" */
import { expect } from 'chai';
import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';

import BookmarkListTestWrapper from '../misc/bookmark-list-test-wrapper';

const BOOKMARK_DATA = [
  [
    '56df2644a7a14638c23fee98',
    {
      title: 'React.js Tutorial',
      bookmark: 'http://example.com/react',
      description: 'Simple tutorial describing React.',
      date: '2016-03-08T17:19:00Z',
      tags: [
        'javascript',
        'react',
      ],
    },
  ],
  [
    '56df2644a7a14638c23fee99',
    {
      title: 'Redux Tutorial',
      bookmark: 'http://example.com/redux',
      description: 'Redux Redux.',
      date: '2016-03-08T17:19:00Z',
      tags: [
        'javascript',
        'redux',
      ],
    },
  ],
];

describe('BookmarkList', () => {
  let component;

  before(() => {
    const dataMap = new Map();
    dataMap.set(BOOKMARK_DATA[0][0], BOOKMARK_DATA[0][1]);
    dataMap.set(BOOKMARK_DATA[1][0], BOOKMARK_DATA[1][1]);
    component = renderIntoDocument(<BookmarkListTestWrapper data={dataMap} />);
  });

  it('is of type div', () => {
  });

  it('has 2 Bookmarks as children', () => {
    const articles = scryRenderedDOMComponentsWithTag(component, 'article');
    expect(articles).to.have.length(2);
  });

  describe('Child Bookmarks', () => {
    it('have correct children', () => {
      const article = scryRenderedDOMComponentsWithTag(component, 'article')[0];
      expect(article.children[0].tagName).to.equal('DIV');
      expect(article.children[1].tagName).to.equal('P');
      expect(article.children[2].tagName).to.equal('UL');
      expect(article.children[3].tagName).to.equal('SPAN');
    });

    it('have the title and url', () => {
      const article = scryRenderedDOMComponentsWithTag(component, 'article')[1];
      const a = article.children[0].children[0];
      expect(a.tagName).to.equal('A');
      expect(a.href).to.equal('http://example.com/redux');
      expect(a.text).to.equal('Redux Tutorial');
    });

    it('have a description', () => {
      const article = scryRenderedDOMComponentsWithTag(component, 'article')[0];
      const p = article.children[1];
      expect(p.tagName).to.equal('P');
      expect(p.innerHTML).to.equal('Simple tutorial describing React.');
    });

    it('has tags', () => {
      const article = scryRenderedDOMComponentsWithTag(component, 'article')[0];
      const tags = article.children[2].children;
      expect(tags[0].tagName).to.equal('LI');
      let a = tags[0].children[0];
      expect(a.tagName).to.equal('A');
      expect(a.text).to.equal('javascript');
      expect(a.href).to.be.empty;
      a = tags[1].children[0];
      expect(a.tagName).to.equal('A');
      expect(a.text).to.equal('react');
      expect(a.href).to.be.empty;
    });
  });
});
