// bookmark-form
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateBookmarkForm,
  resetBookmarkForm,
  submitBookmarkForm,
} from '../app/actions';

export const BookmarkForm = ({ bookmarkForm, actions }) => (
  <div className="col-sm-8">
  <form onSubmit={(e) => { e.preventDefault(); actions.submitBookmarkForm(); }}>
    <fieldset className="form-group">
      <label htmlFor="title">Title</label>
      <input
        id="title"
        className="form-control"
        value={bookmarkForm.title}
        placeHolder="Title"
        onChange={(e) => actions.updateBookmarkForm('title', e.target.value)}
        type="text"
      />
      </fieldset>
    <fieldset className="form-group">
      <label htmlFor="url">URL</label>
      <input
        id="url"
        className="form-control"
        value={bookmarkForm.bookmark}
        placeHolder="URL"
        onChange={(e) => actions.updateBookmarkForm('bookmark', e.target.value)}
        type="url"
      />
    </fieldset>
    <fieldset className="form-group">
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        className="form-control"
        value={bookmarkForm.description}
        placeHolder="URL"
        onChange={(e) => actions.updateBookmarkForm('description', e.target.value)}
      />
    </fieldset>
    <fieldset className="form-group">
      <label htmlFor="tags">Tags</label>
      <input
        id="tags"
        className="form-control"
        value={bookmarkForm.tags}
        onChange={(e) => actions.updateBookmarkForm('tags', e.target.value)}
        type="text"
      />
    </fieldset>
    <fieldset className="btn-toolbar">
      <button
        className="btn btn-primary"
        type="submit"
      >
         Submit
      </button>

      <button
        className="btn btn-secondary"
        type="reset"
        onClick={ (e) => {e.preventDefault(); actions.resetBookmarkForm(); }}
      >
         Reset
      </button>
    </fieldset>
  </form>
  </div>
);

BookmarkForm.propTypes = {
  bookmarkForm: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};


function mapStateToProps({ bookmarkForm }) {
  return { bookmarkForm };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      updateBookmarkForm,
      resetBookmarkForm,
      submitBookmarkForm,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkForm);
