import merge from 'lodash/merge';
import union from 'lodash/union';
import keys from 'lodash/keys';
import { combineReducers } from 'redux';
import {
  SELECT_TAG,
  INVALIDATE_TAG,
  FETCH_BOOKMARKS_PENDING,
  FETCH_BOOKMARKS_SUCCESS,
  FETCH_BOOKMARKS_FAILURE,
} from '../actions';

export function selectedTag(state = '@@INIT@@', action) {
  const { type, payload } = action;
  if (type === SELECT_TAG) {
    return payload.tag;
  }
  return state;
}

export function entities(state = { bookmarks: {} }, action) {
  const { type, payload } = action;
  if (type === FETCH_BOOKMARKS_SUCCESS && payload.response && payload.response.entities) {
    return merge({}, state, payload.response.entities);
  }
  return state;
}

const BOOKMARKS_BY_TAG_DEFAULT = {
  isFetching: false,
  didInvalidate: false,
  atEnd: false,
  items: [],
};

function updateBookmarksForTag(state = BOOKMARKS_BY_TAG_DEFAULT, action) {
  const { type, payload } = action;
  switch (type) {
    case INVALIDATE_TAG:
      return merge({}, state, {
        didInvalidate: true,
      });
    case FETCH_BOOKMARKS_PENDING:
      return merge({}, state, {
        isFetching: true,
      });
    case FETCH_BOOKMARKS_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: union(state.items, keys(payload.response.entities.bookmarks)),
        lastUpdated: payload.receivedAt,
        nextPage: payload.response.nextPage,
        atEnd: !payload.response.nextPage,
      });
    case FETCH_BOOKMARKS_FAILURE:
      return merge({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
}

export function bookmarksByTag(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case INVALIDATE_TAG:
    case FETCH_BOOKMARKS_PENDING:
    case FETCH_BOOKMARKS_SUCCESS:
    case FETCH_BOOKMARKS_FAILURE:
      return merge({}, state, {
        [payload.tag]: updateBookmarksForTag(state[payload.tag], action),
      });
    default:
      return state;
  }
}

export default combineReducers({
  selectedTag,
  entities,
  bookmarksByTag,
});
