import React, { PropTypes } from 'react';

export const BookmarkForm = ({
  bookmarkForm,
  updateBookmarkForm,
  resetBookmarkForm,
  submitBookmarkForm }) => (
  <div className="col-sm-8">
  <form onSubmit={(e) => {
    e.preventDefault();
    submitBookmarkForm();
  }}
  >
    <fieldset className="form-group">
      <label htmlFor="title">Title</label>
      <input
        id="title"
        className="form-control"
        value={bookmarkForm.title}
        placeHolder="Title"
        onChange={(e) => updateBookmarkForm('title', e.target.value)}
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
        onChange={(e) => updateBookmarkForm('bookmark', e.target.value)}
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
        onChange={(e) => updateBookmarkForm('description', e.target.value)}
      />
    </fieldset>
    <fieldset className="form-group">
      <label htmlFor="tags">Tags</label>
      <input
        id="tags"
        className="form-control"
        value={bookmarkForm.tags}
        onChange={(e) => updateBookmarkForm('tags', e.target.value)}
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
        onClick={ (e) => {e.preventDefault(); resetBookmarkForm(); }}
      >
         Reset
      </button>
    </fieldset>
  </form>
  </div>
);

BookmarkForm.propTypes = {
  bookmarkForm: PropTypes.object.isRequired,
  updateBookmarkForm: PropTypes.func.isRequired,
  resetBookmarkForm: PropTypes.func.isRequired,
  submitBookmarkForm: PropTypes.func.isRequired,
};
