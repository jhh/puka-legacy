// bookmark-form
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateBookmarkForm,
  resetBookmarkForm,
  submitBookmarkForm,
} from '../../actions';
import { BookmarkForm } from './view';

function mapStateToProps({ bookmarkForm }) {
  return { bookmarkForm };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateBookmarkForm,
    resetBookmarkForm,
    submitBookmarkForm,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkForm);
