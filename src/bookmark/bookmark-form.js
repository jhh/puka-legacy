// bookmark-form
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateBookmarkForm,
  resetBookmarkForm,
  submitBookmarkForm,
} from '../app/actions';
import { BookmarkForm } from './bookmark-form-view';

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
