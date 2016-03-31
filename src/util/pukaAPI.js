const HOST = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9292';

// TODO: check for JSON API errors
function mapResponse(response) {
  const bookmarks = {};
  try {
    for (const item of response.data) {
      item.attributes.id = item.id;
      bookmarks[item.id] = item.attributes;
    }
  } catch (e) {
    Promise.reject(new Error(e.message));
  }
  return Promise.resolve({
    entities: { bookmarks },
    nextPage: response.links.next,
  });
}

export default (endpoint) =>
  fetch(`${HOST}${endpoint}`, { redirect: 'error', credentials: 'include' }).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.json());
    }
    return Promise.reject(new Error(response.statusText));
  })
  .then(mapResponse);
