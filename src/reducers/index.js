import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import { SELECT_TAG, RECEIVE_BOOKMARKS } from '../actions';

export function selectedTag(state = '', action) {
  const { type, payload } = action;
  if (type === SELECT_TAG) {
    return payload.tag;
  }
  return state;
}

export function entities(state = { bookmarks: {} }, action) {
  const { type, payload } = action;
  if (type === RECEIVE_BOOKMARKS && payload.response && payload.response.entities) {
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
