export const TAG_NONE = '@@TAG_NONE@@';
export const SELECT_TAG = 'SELECT_TAG';
export const INVALIDATE_TAG = 'INVALIDATE_TAG';
export const FETCH_BOOKMARKS_PENDING = 'FETCH_BOOKMARKS_PENDING';
export const FETCH_BOOKMARKS_SUCCESS = 'FETCH_BOOKMARKS_SUCCESS';
export const FETCH_BOOKMARKS_FAILURE = 'FETCH_BOOKMARKS_FAILURE';

export const BOOKMARK_FORM_INITIALIZE = 'BOOKMARK_FORM_INITIALIZE';
export const BOOKMARK_FORM_UPDATE_VALUE = 'BOOKMARK_FORM_UPDATE_VALUE';
export const BOOKMARK_FORM_RESET = 'BOOKMARK_FORM_RESET';

export const SAVE_BOOKMARK_PENDING = 'SAVE_BOOKMARK_PENDING';
export const SAVE_BOOKMARK_SUCCESS = 'SAVE_BOOKMARK_SUCCESS';
export const SAVE_BOOKMARK_FAILURE = 'SAVE_BOOKMARK_FAILURE';

export const UPDATE_BOOKMARKS = 'UPDATE_BOOKMARKS';

const PUKA_DEV_API_HOST = process.env.PUKA_DEV_API_HOST || 'localhost';

export const HOST = process.env.NODE_ENV === 'production' ?
  'https://puka-api-001.herokuapp.com' : `http://${PUKA_DEV_API_HOST}:9292`;
