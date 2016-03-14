import axios from 'axios'

export async function getBookmarks() {
  try {
    const response = await axios.get('/api/bookmarks?page[limit]=20')
    return response.data
  } catch (e) {
    console.warn('Error in getBookmarks', e)
  }
}

export async function getBookmarksByTag(tag) {
  try {
    const response = await axios.get('/api/bookmarks', {
      params: {
        'filter[tag]': tag
      }
    })
    return response.data
  } catch (e) {
    console.warn('Error in getBookmarksByTag', e)
  }
}

export async function getBookmark(id) {
  try {
    const response = await axios.get('/api/bookmarks/' + id)
    return response.data
  } catch (e) {
    console.warn('Error in getBookmarks', e)
  }
}
