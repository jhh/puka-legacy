import pukaAPI from '../util/pukaAPI';

export const SELECT_TAG = 'SELECT_TAG';

export const selectTag = (tag) => ({
  type: SELECT_TAG,
  payload: {
    tag,
  },
});

export const INVALIDATE_TAG = 'INVALIDATE_TAG';

export const invalidateTag = (tag) => ({
  type: INVALIDATE_TAG,
  payload: {
    tag,
  },
});

export const REQUEST_BOOKMARKS = 'REQUEST_BOOKMARKS';

export const requestBookmarks = (tag) => ({
  type: REQUEST_BOOKMARKS,
  payload: {
    tag,
  },
});

export const RECEIVE_BOOKMARKS = 'RECEIVE_BOOKMARKS';

export const receiveBookmarks = (tag, response) => ({
  type: RECEIVE_BOOKMARKS,
  payload: {
    tag,
    response,
  },
});

const fetchBookmarks = (tag) => dispatch => {
  dispatch(requestBookmarks(tag));
  return pukaAPI.getBookmarks(tag)
    .then(map => dispatch(receiveBookmarks(tag, map)));
};

const shouldFetchBookmarks = (state, tag) => {
  const bookmarks = state.bookmarksByTag[tag];
  if (!bookmarks) {
    return true;
  } else if (bookmarks.isFetching) {
    return false;
  }
  return bookmarks.didInvalidate;
};

export const fetchBookmarksIfNeeded = (tag) => (dispatch, getState) => {
  if (shouldFetchBookmarks(getState(), tag)) {
    return dispatch(fetchBookmarks(tag));
  }
  return Promise.resolve();
};
