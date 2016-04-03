import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBookmarksIfNeeded } from '../../actions';
import { Main } from './view';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBookmarksIfNeeded }, dispatch);
}

export default connect(undefined, mapDispatchToProps)(Main);
