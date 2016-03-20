/* eslint react/prefer-stateless-function: "off" */
import React from 'react';
import BookmarkList from '../../src/components/bookmark-list';

export default class BookmarkListTestWrapper extends React.Component {
  render() {
    return <BookmarkList {...this.props} />;
  }
}
