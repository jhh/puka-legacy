import { browserHistory } from 'react-router';
import keys from 'lodash/keys';
import { saveBookmark, updateBookmark } from '../util/pukaAPI';
import * as c from '../app/constants';

export const initializeBookmarkForm = (bookmark) => ({
  type: c.BOOKMARK_FORM_INITIALIZE,
  payload: {
    bookmark,
  },
});

export const initializeBookmarkFormForID = (id) => (dispatch, getState) => {
  const bookmark = getState().entities.bookmarks[id];
  dispatch(initializeBookmarkForm(bookmark));
};

export const updateBookmarkForm = (name, value) => ({
  type: c.BOOKMARK_FORM_UPDATE_VALUE,
  payload: {
    name,
    value,
  },
});

export const resetBookmarkForm = () => ({
  type: c.BOOKMARK_FORM_RESET,
});

export const saveBookmarkPending = () => ({
  type: c.SAVE_BOOKMARK_PENDING,
});

export const saveBookmarkSuccess = (response) => ({
  type: c.SAVE_BOOKMARK_SUCCESS,
  payload: {
    response,
  },
});

export const saveBookmarkFailure = (reason) => ({
  type: c.SAVE_BOOKMARK_FAILURE,
  error: true,
  payload: {
    reason,
  },
});

export const addBookmark = (tag, bookmark) => ({
  type: c.ADD_BOOKMARK,
  payload: {
    tag,
    bookmark,
    receivedAt: Date.now(),
  },
});

export const submitBookmarkForm = () => (dispatch, getState) => {
  dispatch(saveBookmarkPending());
  const bookmarkForm = getState().bookmarkForm;
  const api = bookmarkForm.id ? updateBookmark : saveBookmark;
  return api(`${c.HOST}/api/bookmarks`, bookmarkForm)
    .then(response => {
      dispatch(saveBookmarkSuccess(response));
      try {
        const bookmarks = response.entities.bookmarks;
        const id = keys(bookmarks)[0];
        bookmarks[id].tags.map(t => dispatch(addBookmark(t, bookmarks)));
        dispatch(addBookmark(c.TAG_NONE, bookmarks));
        dispatch(resetBookmarkForm());
        browserHistory.push('/');
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(`Error in actions.submitBookmarkForm: ${e.message}`);
      }
    })
    .catch(reason => dispatch(saveBookmarkFailure(reason)));
};
