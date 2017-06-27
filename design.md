Redux state shape.

```javascript
{
  selectedTag: 'redux',
  entities: {
    bookmarks: {
      '56df2644a7a14638c23fee98': {
        id: '56df2644a7a14638c23fee98',
        title: 'React.js Tutorial',
        url: 'http://example.com/react',
        description: 'Simple tutorial describing React.',
        date: '2016-03-08T17:19:00Z',
        tags: [
          'javascript',
          'react',
        ]        
      },
      '56df2644a7a14638c23fee99': {
        id: '56df2644a7a14638c23fee99',
        title: 'Optimizing React Performance',
        url: 'http://example.com/optimizing-react',
        description: 'Optimizing React Performance using performance tools',
        date: '2016-03-06T13:24:00Z',
        tags: [
          'javascript',
          'react',
        ]        
      }
    }
  },
  bookmarksByTag: {
    redux: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    react: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      nextPageUrl: 'http://localhost/api/bookmarks?page[offset]=20&filter[tag]=react'
      items: ['56df2644a7a14638c23fee98', '56df2644a7a14638c23fee98']
    }
  }
}
```
