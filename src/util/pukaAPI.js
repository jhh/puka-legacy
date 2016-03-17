import fetch from 'isomorphic-fetch';

const HOST = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9292';

function mapResponse(json) {
  const map = new Map();
  for (const item of json.data) {
    map.set(item.id, item.attributes);
  }
  return map;
}

export default {
  getBookmarks: () => fetch(`${HOST}/api/bookmarks?page[limit]=100`)
    .then(response => response.json())
    .then(mapResponse),
  getBookmarksByTag: (tag) => fetch(`${HOST}/api/bookmarks?page[limit]=100&filter[tag]=${tag}`)
    .then(response => response.json())
    .then(mapResponse),
  getBookmark: (id) => fetch(`${HOST}/api/bookmarks/${id}`)
  .then(response => response.json())
  .then(mapResponse),
};
