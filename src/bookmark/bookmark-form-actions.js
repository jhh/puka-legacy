import { browserHistory } from 'react-router';
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

const processRemoveBookmark = (dispatch, response) => {
  console.warn('Unimplemented');
};

const processAddBookmark = (dispatch, response) => {
  const bookmarks = response.entities.bookmarks;
  if (process.env.NODE_ENV !== 'production') {
    const len = Object.keys(bookmarks).length;
    if (len !== 1) {
      console.error(`assertion failure: bookmarks length = ${len}`);
    }
  }
  const id = Object.keys(bookmarks)[0];
  bookmarks[id].tags.map(t => dispatch(addBookmark(t, bookmarks)));
  dispatch(addBookmark(c.TAG_NONE, bookmarks));
};

export const submitBookmarkForm = () => (dispatch, getState) => {
  dispatch(saveBookmarkPending());
  const bookmarkForm = getState().bookmarkForm;
  const isUpdate = !!bookmarkForm.id;
  const api = isUpdate ? updateBookmark : saveBookmark;
  return api(PUKA_API_ENDPOINT, bookmarkForm)
    .then(response => {
      dispatch(saveBookmarkSuccess(response));
      try {
        if (isUpdate) {
          processRemoveBookmark(dispatch, response);
        }
        processAddBookmark(dispatch, response);
        dispatch(resetBookmarkForm());
        browserHistory.push('/');
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(`Error in actions.submitBookmarkForm: ${e.message}`);
      }
    })
    .catch(reason => dispatch(saveBookmarkFailure(reason)));
};
