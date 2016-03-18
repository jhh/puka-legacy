import { expect } from 'chai';
import React from 'react';
import {
  createRenderer,
} from 'react-addons-test-utils';

import BookmarkList from '../../src/components/bookmark-list';

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
];

describe('BookmarkList', () => {
  let component;

  before(() => {
    const dataMap = new Map();
    dataMap.set(BOOKMARK_DATA[0][0], BOOKMARK_DATA[0][1]);
    dataMap.set(BOOKMARK_DATA[1][0], BOOKMARK_DATA[1][1]);
    const renderer = createRenderer();
    renderer.render(<BookmarkList data={dataMap} />);
    component = renderer.getRenderOutput();
  });

  it('is of type div', () => {
    expect(component.type).to.equal('div');
  });

  it('has 2 Bookmarks as children', () => {
    expect(component.props.children).to.have.length(2);
  });
});
