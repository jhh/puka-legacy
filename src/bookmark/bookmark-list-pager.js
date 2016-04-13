import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchBookmarksIfNeeded, invalidateTag } from '../app/actions';

export class BookmarkListPager extends React.Component {

  componentDidMount() {
    this.handleScroll = () => {
      const { actions, selectedTag, isFetching, atEnd } = this.props;
      const pageHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (pageHeight - (window.pageYOffset + clientHeight) < 50 && !isFetching && !atEnd) {
        actions.invalidateTag(selectedTag);
        actions.fetchBookmarksIfNeeded(selectedTag);
      }
    };
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return this.props.isFetching ? <div>FETCHING</div> : <div />;
  }
}

BookmarkListPager.propTypes = {
  actions: PropTypes.object.isRequired,
  selectedTag: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  atEnd: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { selectedTag, bookmarksByTag } = state;
  let isFetching = false;
  let atEnd = false;
  const bookmarks = bookmarksByTag[selectedTag];
  if (bookmarks) {
    isFetching = bookmarks.isFetching;
    atEnd = bookmarks.atEnd;
  }
  return ({
    selectedTag,
    isFetching,
    atEnd,
  });
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ invalidateTag, fetchBookmarksIfNeeded }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkListPager);
