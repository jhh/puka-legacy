import keys from 'lodash/keys';
import pukaAPI from '../util/pukaAPI';

export const TAG_NONE = '@@TAG_NONE@@';
export const SELECT_TAG = 'SELECT_TAG';
export const INVALIDATE_TAG = 'INVALIDATE_TAG';
export const FETCH_BOOKMARKS_PENDING = 'FETCH_BOOKMARKS_PENDING';
export const FETCH_BOOKMARKS_SUCCESS = 'FETCH_BOOKMARKS_SUCCESS';
export const FETCH_BOOKMARKS_FAILURE = 'FETCH_BOOKMARKS_FAILURE';

export const BOOKMARK_FORM_UPDATE_VALUE = 'BOOKMARK_FORM_UPDATE_VALUE';
export const BOOKMARK_FORM_RESET = 'BOOKMARK_FORM_RESET';

export const SAVE_BOOKMARK_PENDING = 'SAVE_BOOKMARK_PENDING';
export const SAVE_BOOKMARK_SUCCESS = 'SAVE_BOOKMARK_SUCCESS';
export const SAVE_BOOKMARK_FAILURE = 'SAVE_BOOKMARK_FAILURE';

export const UPDATE_BOOKMARKS = 'UPDATE_BOOKMARKS';

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

const HOST = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9292';

const endpoint = (state) => {
  const tag = state.selectedTag;
  const bookmarks = state.bookmarksByTag[state.selectedTag];
  if (bookmarks && bookmarks.nextPage) {
    return bookmarks.nextPage;
  }
  return tag === TAG_NONE ? `${HOST}/api/bookmarks?page[limit]=100`
                          : `${HOST}/api/bookmarks?page[limit]=100&filter[tag]=${tag}`;
};

const fetchBookmarks = () => (dispatch, getState) => {
  const tag = getState().selectedTag;
  dispatch(fetchBookmarksPending(tag));
  return pukaAPI.getBookmarks(endpoint(getState()))
    .then(response => dispatch(fetchBookmarksSuccess(tag, response)))
    .catch(error => dispatch(fetchBookmarksFailure(tag, error)));
};

const shouldFetchBookmarks = (state) => {
  const bookmarks = state.bookmarksByTag[state.selectedTag];
  if (!bookmarks) {
    return true;
  } else if (bookmarks.isFetching) {
    return false;
  } else if (bookmarks.didInvalidate) {
    return true;
  }
  return !bookmarks.atEnd;
};

export const fetchBookmarksIfNeeded = (tag) => (dispatch, getState) => {
  if (tag !== getState().selectedTag) {
    dispatch(selectTag(tag));
  }
  if (shouldFetchBookmarks(getState())) {
    return dispatch(fetchBookmarks());
  }
  return Promise.resolve();
};

export const updateBookmarkForm = (name, value) => ({
  type: BOOKMARK_FORM_UPDATE_VALUE,
  payload: {
    name,
    value,
  },
});

export const resetBookmarkForm = () => ({
  type: BOOKMARK_FORM_RESET,
});

export const saveBookmarkPending = () => ({
  type: SAVE_BOOKMARK_PENDING,
});

export const saveBookmarkSuccess = (response) => ({
  type: SAVE_BOOKMARK_SUCCESS,
  payload: {
    response,
  },
});

export const saveBookmarkFailure = (reason) => ({
  type: SAVE_BOOKMARK_FAILURE,
  error: true,
  payload: {
    reason,
  },
});

export const updateBookmarks = (tag, bookmark) => ({
  type: UPDATE_BOOKMARKS,
  payload: {
    tag,
    bookmark,
    receivedAt: Date.now(),
  },
});

export const submitBookmarkForm = () => (dispatch, getState) => {
  dispatch(saveBookmarkPending());
  return pukaAPI.saveBookmark(`${HOST}/api/bookmarks`, getState().bookmarkForm)
    .then(response => {
      dispatch(saveBookmarkSuccess(response));
      try {
        const bookmarks = response.entities.bookmarks;
        const id = keys(bookmarks)[0];
        bookmarks[id].tags.map(t => dispatch(updateBookmarks(t, bookmarks)));
        dispatch(updateBookmarks(TAG_NONE, bookmarks));
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(`Error in actions.submitBookmarkForm: ${e.message}`);
      }
    })
    .catch(reason => dispatch(saveBookmarkFailure(reason)));
};
