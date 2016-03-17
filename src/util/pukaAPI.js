import fetch from 'isomorphic-fetch';

const HOST = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9292';

export default {
  getBookmarks: () => fetch(`${HOST}/api/bookmarks?page[limit]=100`)
    .then(response => response.json())
    .then((json) => {
      const map = new Map();
      for (const item of json.data) {
        map.set(item.id, item.attributes);
      }
      return map;
    }),

  // getBookmarksByTag: async (tag) => {
  //   try {
  //     const response = await axios.get(`${HOST}/api/bookmarks`, {
  //       params: {
  //         'filter[tag]': tag,
  //       },
  //     });
  //     return response.data;
  //   } catch (e) {
  //     console.warn('Error in getBookmarksByTag', e);
  //   }
  //   return null;
  // },
  //
  // getBookmark: async (id) => {
  //   try {
  //     const response = await axios.get(`${HOST}/api/bookmarks/${id}`);
  //     return response.data;
  //   } catch (e) {
  //     console.warn('Error in getBookmarks', e);
  //   }
  //   return null;
  // },
};
