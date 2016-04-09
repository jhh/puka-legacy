const JSON_API_CONTENT_TYPE = 'application/vnd.api+json';

function mapResponse(response) {
  const bookmarks = {};
  try {
    if (Array.isArray(response.data)) {
      for (const item of response.data) {
        item.attributes.id = item.id;
        bookmarks[item.id] = item.attributes;
      }
    } else {
      const item = response.data;
      item.attributes.id = item.id;
      bookmarks[item.id] = item.attributes;
    }
  } catch (e) {
    return Promise.reject(`Error in pukaAPI.mapResponse: ${e.message}`);
  }
  return Promise.resolve({
    entities: { bookmarks },
    nextPage: response.links.next,
  });
}

export default {
  getBookmarks: (endpoint) =>
    fetch(endpoint, {
      redirect: 'error',
      credentials: 'include',
      headers: {
        Accept: JSON_API_CONTENT_TYPE,
      },
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response.json());
      }
      return Promise.reject(`Error in pukaAPI.getBookmarks response: ${response.statusText}`);
    })
    .then(mapResponse),

  saveBookmark: (endpoint, bookmark) => {
    const body = {
      data: {
        type: 'bookmarks',
        attributes: bookmark,
      },
    };
    body.data.attributes.tags = bookmark.tags.split(/\s*,\s*/);
    return fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      redirect: 'error',
      credentials: 'include',
      headers: {
        Accept: JSON_API_CONTENT_TYPE,
        'Content-Type': JSON_API_CONTENT_TYPE,
      },
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response.json());
      }
      return Promise.reject(`Error in pukaAPI.saveBookmark response: ${response.statusText}`);
    })
    .then(mapResponse);
  },
};
