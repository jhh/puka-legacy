import { expect } from 'chai';
import * as actions from '../../src/bookmark/bookmark-list-actions';
import { entities } from '../../src/app/reducers';

export const BOOKMARK_1 = {
  key: '56df2644a7a14638c23fee98',
  value: {
    id: '56df2644a7a14638c23fee98',
    title: 'React.js Tutorial',
    url: 'http://example.com/react',
    description: 'Simple tutorial describing React.',
    date: '2016-03-08T17:19:00Z',
    tags: [
      'javascript',
      'react',
    ],
  },
};

export const BOOKMARK_2 = {
  key: '56df2644a7a14638c23fee99',
  value: {
    id: '56df2644a7a14638c23fee99',
    title: 'Redux',
    url: 'http://example.com/optimizing-react',
    description: 'All about Redux.',
    date: '2016-03-06T13:24:00Z',
    tags: [
      'javascript',
      'redux',
    ],
  },
};

describe('reducer', () => {
  describe('entities', () => {
    it('should reduce to the selected tag with uninitialized state', () => {
      const state = undefined;

      const response = {
        entities: {
          bookmarks: {
            [BOOKMARK_1.key]: BOOKMARK_1.value,
            [BOOKMARK_2.key]: BOOKMARK_2.value,
          },
        },
      };

      const tag = 'foo';

      const newState = entities(state, actions.fetchBookmarksSuccess(tag, response));
      expect(newState).to.deep.equal(response.entities);
    });

    it('should reduce to the selected tag with initialized state', () => {
      const state = {
        bookmarks: {
          [BOOKMARK_1.key]: BOOKMARK_1.value,
        },
      };

      const response = {
        entities: {
          bookmarks: {
            [BOOKMARK_2.key]: BOOKMARK_2.value,
          },
        },
      };

      const tag = 'foo';

      const newState = entities(state, actions.fetchBookmarksSuccess(tag, response));
      expect(newState).to.deep.equal({
        bookmarks: {
          [BOOKMARK_1.key]: BOOKMARK_1.value,
          [BOOKMARK_2.key]: BOOKMARK_2.value,
        },
      });
    });

    it('should overwrite an updated entity', () => {
      const state = {
        bookmarks: {
          [BOOKMARK_1.key]: BOOKMARK_1.value,
          [BOOKMARK_2.key]: BOOKMARK_2.value,
        },
      };

      const response = {
        entities: {
          bookmarks: {
            [BOOKMARK_2.key]: BOOKMARK_1.value,
          },
        },
      };

      const tag = 'foo';

      const newState = entities(state, actions.fetchBookmarksSuccess(tag, response));
      // console.log(JSON.stringify(newState, null, 2));
      expect(newState).to.deep.equal({
        bookmarks: {
          [BOOKMARK_1.key]: BOOKMARK_1.value,
          [BOOKMARK_2.key]: BOOKMARK_1.value,
        },
      });
    });
  });
});
