import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import { SELECT_TAG, FETCH_BOOKMARKS_SUCCESS } from '../actions';

export function selectedTag(state = '', action) {
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

// function bookmarksByTag(state = ) {
//
// }

export default combineReducers({
  selectedTag,
  entities,
  // bookmarksByTag,
});
