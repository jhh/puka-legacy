import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBookmarksIfNeeded } from '../actions';
import { Main } from '../components/main';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBookmarksIfNeeded }, dispatch);
}

export default connect(undefined, mapDispatchToProps)(Main);
