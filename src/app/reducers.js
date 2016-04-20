import merge from 'lodash/merge';
import union from 'lodash/union';
import concat from 'lodash/concat';
import keys from 'lodash/keys';
import { combineReducers } from 'redux';
import * as c from './constants';

export function selectedTag(state = '@@INIT@@', action) {
  const { type, payload } = action;
  if (type === c.SELECT_TAG) {
    return payload.tag;
  }
  return state;
}

export function entities(state = { bookmarks: {} }, action) {
  const { type, payload } = action;
  switch (type) {
    case c.FETCH_BOOKMARKS_SUCCESS:
    case c.SAVE_BOOKMARK_SUCCESS:
      if (payload.response && payload.response.entities) {
        return merge({}, state, payload.response.entities);
      }
      return state;
    default:
      return state;
  }
}

const BOOKMARKS_BY_TAG_DEFAULT = {
  isFetching: false,
  didInvalidate: false,
  atEnd: false,
  items: [],
};

function updateBookmarksByTagFromFetch(state = BOOKMARKS_BY_TAG_DEFAULT, action) {
  const { type, payload } = action;
  switch (type) {
    case c.INVALIDATE_TAG:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case c.FETCH_BOOKMARKS_PENDING:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case c.FETCH_BOOKMARKS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: union(state.items, keys(payload.response.entities.bookmarks)),
        lastUpdated: payload.receivedAt,
        nextPage: payload.response.nextPage,
        atEnd: !payload.response.nextPage,
      });
    case c.FETCH_BOOKMARKS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
}

function updateBookmarksByTag(state = BOOKMARKS_BY_TAG_DEFAULT, action) {
  const { type, payload } = action;
  if (type === c.UPDATE_BOOKMARKS) {
    return Object.assign({}, state, {
      items: concat(keys(payload.bookmark), state.items),
      lastUpdated: payload.receivedAt,
    });
  }
  return state;
}

export function bookmarksByTag(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case c.INVALIDATE_TAG:
    case c.FETCH_BOOKMARKS_PENDING:
    case c.FETCH_BOOKMARKS_SUCCESS:
    case c.FETCH_BOOKMARKS_FAILURE:
      return Object.assign({}, state, {
        [payload.tag]: updateBookmarksByTagFromFetch(state[payload.tag], action),
      });
    case c.UPDATE_BOOKMARKS:
      return Object.assign({}, state, {
        [payload.tag]: updateBookmarksByTag(state[payload.tag], action),
      });
    default:
      return state;
  }
}

const BOOKMARK_FORM_DEFAULT = {
  title: '',
  bookmark: '',
  description: '',
  tags: '',
};

function bookmarkForm(state = BOOKMARK_FORM_DEFAULT, action) {
  const { type, payload } = action;
  switch (type) {
    case c.BOOKMARK_FORM_UPDATE_VALUE:
      return Object.assign({}, state, {
        [payload.name]: payload.value,
      });
    case c.BOOKMARK_FORM_INITIALIZE:
      return Object.assign({}, state, payload.bookmark);
    case c.BOOKMARK_FORM_RESET:
      return BOOKMARK_FORM_DEFAULT;
    default:
      return state;
  }
}

export default combineReducers({
  selectedTag,
  entities,
  bookmarksByTag,
  bookmarkForm,
});
