import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectTag, TAG_NONE } from '../../actions';
import BookmarkList from '../bookmark-list';
import BookmarkListPager from '../bookmark-list-pager';

class BookmarkPage extends React.Component {

  componentDidMount() {
    const { dispatch, routeParams: { tag } } = this.props;
    dispatch(selectTag(tag || TAG_NONE));
  }

  componentWillReceiveProps({ routeParams: { tag } }) {
    if (tag) {
      this.props.dispatch(selectTag(tag));
    }
  }

  render() {
    return (
      <div>
        <BookmarkList />
        <BookmarkListPager />
      </div>
    );
  }
}

BookmarkPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  routeParams: PropTypes.shape({
    tag: PropTypes.string,
  }).isRequired,
};

export default connect()(BookmarkPage);
