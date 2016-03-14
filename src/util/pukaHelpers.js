import axios from 'axios'

const HOST = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9292'

export default {
  getBookmarks:async () => {
    try {
      const response = await axios.get(HOST + '/api/bookmarks?page[limit]=100')
      return response.data
    } catch (e) {
      console.warn('Error in getBookmarks', e)
    }
  },

  getBookmarksByTag:async (tag) => {
    try {
      const response = await axios.get(HOST + '/api/bookmarks', {
        params: {
          'filter[tag]': tag
        }
      })
      return response.data
    } catch (e) {
      console.warn('Error in getBookmarksByTag', e)
    }
  },

  getBookmark:async (id) => {
    try {
      const response = await axios.get(HOST + '/api/bookmarks/' + id)
      return response.data
    } catch (e) {
      console.warn('Error in getBookmarks', e)
    }
  }
}
