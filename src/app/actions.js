import { getBookmarks } from '../util/pukaAPI';
import * as c from './constants';

export const selectTag = (tag) => ({
  type: c.SELECT_TAG,
  payload: {
    tag,
  },
});

export const invalidateTag = (tag) => ({
  type: c.INVALIDATE_TAG,
  payload: {
    tag,
  },
});

export const fetchBookmarksPending = (tag) => ({
  type: c.FETCH_BOOKMARKS_PENDING,
  payload: {
    tag,
  },
});

export const fetchBookmarksSuccess = (tag, response) => ({
  type: c.FETCH_BOOKMARKS_SUCCESS,
  payload: {
    tag,
    response,
    receivedAt: Date.now(),
  },
});

export const fetchBookmarksFailure = (tag, error) => ({
  type: c.FETCH_BOOKMARKS_FAILURE,
  error: true,
  payload: {
    tag,
    error,
  },
});

const endpoint = (state) => {
  const tag = state.selectedTag;
  const bookmarks = state.bookmarksByTag[state.selectedTag];
  if (bookmarks && bookmarks.nextPage) {
    return bookmarks.nextPage;
  }
  return tag === c.TAG_NONE ? `${c.HOST}/api/bookmarks?page[limit]=100`
                          : `${c.HOST}/api/bookmarks?page[limit]=100&filter[tag]=${tag}`;
};

const fetchBookmarks = () => (dispatch, getState) => {
  const tag = getState().selectedTag;
  dispatch(fetchBookmarksPending(tag));
  return getBookmarks(endpoint(getState()))
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
