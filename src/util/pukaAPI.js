import fetch from 'isomorphic-fetch';

const HOST = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9292';

// TODO: check for JSON API errors
function mapResponse(response) {
  const map = new Map();
  try {
    for (const item of response.data) {
      map.set(item.id, item.attributes);
    }
  } catch (e) {
    Promise.reject(new Error(e.message));
  }
  return Promise.resolve(map);
}

function doFetch(url) {
  return fetch(url, { redirect: 'error', credentials: 'include' }).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.json());
    }
    return Promise.reject(new Error(response.statusText));
  })
  .then(mapResponse);
}

export default {
  getBookmarks: () => doFetch(`${HOST}/api/bookmarks?page[limit]=100`),
  getBookmarksByTag: (tag) => doFetch(`${HOST}/api/bookmarks?page[limit]=100&filter[tag]=${tag}`),
  getBookmark: (id) => doFetch(`${HOST}/api/bookmarks/${id}`),
};
