import { expect } from 'chai';
import * as actions from '../../src/actions';
import { bookmarksByTag } from '../../src/reducers';
import { BOOKMARK_1, BOOKMARK_2 } from './entities_spec';

describe('reducer', () => {
  describe('bookmarksByTag', () => {
    it('returns default state for unhandled action', () => {
      const unhandledAction = actions.selectTag('foo');
      const newState = bookmarksByTag({}, unhandledAction);
      expect(newState).to.deep.equal({});
    });

    it('returns default state for new tag', () => {
      const response = {
        entities: {
          bookmarks: {},
        },
      };
      const successAction = actions.fetchBookmarksSuccess(actions.TAG_NONE, response);
      const newState = bookmarksByTag({}, successAction);
      const lastUpdated = newState[actions.TAG_NONE].lastUpdated;
      expect(newState).to.deep.equal({
        [actions.TAG_NONE]: {
          isFetching: false,
          didInvalidate: false,
          items: [],
          lastUpdated,
        },
      });
    });

    it('marks state as pending', () => {
      const pendingAction = actions.fetchBookmarksPending(actions.TAG_NONE);
      const newState = bookmarksByTag({}, pendingAction);
      expect(newState).to.deep.equal({
        [actions.TAG_NONE]: {
          isFetching: true,
          didInvalidate: false,
          items: [],
        },
      });
    });

    it('marks state as failure', () => {
      const failureAction = actions.fetchBookmarksFailure(actions.TAG_NONE);
      const newState = bookmarksByTag({}, failureAction);
      expect(newState).to.deep.equal({
        [actions.TAG_NONE]: {
          isFetching: false,
          didInvalidate: false,
          items: [],
        },
      });
    });

    it('merges ids on success action', () => {
      const state = {
        [actions.TAG_NONE]: {
          isFetching: true,
          didInvalidate: false,
          items: ['aaa', 'bbb'],
          lastUpdated: Date.now(),
        },
      };

      const response = {
        entities: {
          bookmarks: {
            [BOOKMARK_1.key]: BOOKMARK_1.value,
            [BOOKMARK_2.key]: BOOKMARK_2.value,
          },
        },
      };

      const successAction = actions.fetchBookmarksSuccess(actions.TAG_NONE, response);
      const newState = bookmarksByTag(state, successAction);
      const lastUpdated = newState[actions.TAG_NONE].lastUpdated;
      expect(newState).to.deep.equal({
        [actions.TAG_NONE]: {
          isFetching: false,
          didInvalidate: false,
          items: ['aaa', 'bbb', '56df2644a7a14638c23fee98', '56df2644a7a14638c23fee99'],
          lastUpdated,
        },
      });
    });

    it('adds ids for new tag on success action', () => {
      const state = {
        [actions.TAG_NONE]: {
          isFetching: false,
          didInvalidate: false,
          items: ['aaa', 'bbb'],
          lastUpdated: Date.now(),
        },
      };

      const response = {
        entities: {
          bookmarks: {
            [BOOKMARK_1.key]: BOOKMARK_1.value,
            [BOOKMARK_2.key]: BOOKMARK_2.value,
          },
        },
      };

      const tag = 'foo';
      const successAction = actions.fetchBookmarksSuccess(tag, response);
      const newState = bookmarksByTag(state, successAction);
      expect(newState).to.deep.equal({
        [actions.TAG_NONE]: {
          isFetching: false,
          didInvalidate: false,
          items: ['aaa', 'bbb'],
          lastUpdated: state[actions.TAG_NONE].lastUpdated,
        },
        [tag]: {
          isFetching: false,
          didInvalidate: false,
          items: ['56df2644a7a14638c23fee98', '56df2644a7a14638c23fee99'],
          lastUpdated: newState[tag].lastUpdated,
        },
      });
    });
  });
});
