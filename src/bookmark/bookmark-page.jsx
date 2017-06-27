import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectTag } from './bookmark-list-actions';
import BookmarkList from './bookmark-list';
import BookmarkListPager from './bookmark-list-pager';
import * as c from '../app/constants';

class BookmarkPage extends React.Component {

  componentDidMount() {
    const { actions, routeParams: { tag } } = this.props;
    actions.selectTag(tag || c.TAG_NONE);
  }

  componentWillReceiveProps({ actions, routeParams: { tag } }) {
    actions.selectTag(tag || c.TAG_NONE);
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
  actions: PropTypes.object.isRequired,
  routeParams: PropTypes.shape({
    tag: PropTypes.string,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ selectTag }, dispatch),
  };
}

export default connect(undefined, mapDispatchToProps)(BookmarkPage);
