import pukaAPI from '../util/pukaAPI';

export const TAG_NONE = 'TAG_NONE';
export const SELECT_TAG = 'SELECT_TAG';
export const INVALIDATE_TAG = 'INVALIDATE_TAG';
export const FETCH_BOOKMARKS_PENDING = 'FETCH_BOOKMARKS_PENDING';
export const FETCH_BOOKMARKS_SUCCESS = 'FETCH_BOOKMARKS_SUCCESS';
export const FETCH_BOOKMARKS_FAILURE = 'FETCH_BOOKMARKS_FAILURE';

export const selectTag = (tag) => ({
  type: SELECT_TAG,
  payload: {
    tag,
  },
});

export const invalidateTag = (tag) => ({
  type: INVALIDATE_TAG,
  payload: {
    tag,
  },
});

export const fetchBookmarksPending = (tag) => ({
  type: FETCH_BOOKMARKS_PENDING,
  payload: {
    tag,
  },
});

export const fetchBookmarksSuccess = (tag, response) => ({
  type: FETCH_BOOKMARKS_SUCCESS,
  payload: {
    tag,
    response,
    receivedAt: Date.now(),
  },
});

export const fetchBookmarksFailure = (tag, error) => ({
  type: FETCH_BOOKMARKS_FAILURE,
  error: true,
  payload: {
    tag,
    error,
  },
});

const fetchBookmarks = (tag) => dispatch => {
  dispatch(fetchBookmarksPending(tag));
  return pukaAPI.getBookmarks(tag)
    .then(response => dispatch(fetchBookmarksSuccess(tag, response)))
    .catch(error => dispatch(fetchBookmarksFailure(tag, error)));
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
