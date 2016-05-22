package resource // import "jhhgo.us/pukaws/lib/resource"

import (
	"errors"
	"net/http"

	"github.com/manyminds/api2go"
	"jhhgo.us/pukaws/lib"
	"jhhgo.us/pukaws/lib/storage"
)

const typeErrMsg = "Invalid instance given"

// The BookmarkResource struct implements api2go routes.
type BookmarkResource struct {
	BookmarkStorage storage.BookmarkStorage
}

// FindAll satisfies api2go.FindAll interface
func (s BookmarkResource) FindAll(r api2go.Request) (api2go.Responder, error) {
	// check for authentication error set by middleware
	if err, ok := r.Context.Get("error"); ok {
		return &Response{}, err.(error)
	}
	bookmarks, err := s.BookmarkStorage.GetAll(storage.NewQuery(r))
	if err != nil {
		return &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusInternalServerError)
	}
	return &Response{Res: bookmarks, Code: http.StatusOK}, nil
}

// PaginatedFindAll satisfies the api2go.PaginatedFindAll interface
func (s BookmarkResource) PaginatedFindAll(r api2go.Request) (uint, api2go.Responder, error) {
	// check for authentication error set by middleware
	if err, ok := r.Context.Get("error"); ok {
		return 0, &Response{}, err.(error)
	}

	p, err := NewPaginator(r)
	if err != nil {
		return 0, &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusBadRequest)
	}
	q := storage.NewQuery(r)
	count, err := s.BookmarkStorage.Count(q)
	if err != nil {
		return 0, &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusInternalServerError)
	}
	bookmarks, err := s.BookmarkStorage.GetPage(q, p.Skip, p.Limit)
	if err != nil {
		return 0, &Response{}, err
	}

	// total count, response, error
	return uint(count), &Response{Res: bookmarks, Code: http.StatusOK}, nil
}

// FindOne satisfies api2go.CRUD interface
func (s BookmarkResource) FindOne(id string, r api2go.Request) (api2go.Responder, error) {
	// check for authentication error set by middleware
	if err, ok := r.Context.Get("error"); ok {
		return &Response{}, err.(error)
	}

	bookmark, err := s.BookmarkStorage.GetOne(id)
	if err != nil {
		return &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusNotFound)
	}
	return &Response{Res: bookmark, Code: http.StatusOK}, nil
}

// Create satisfies api2go.CRUD interface
func (s BookmarkResource) Create(obj interface{}, r api2go.Request) (api2go.Responder, error) {
	// check for authentication error set by middleware
	if err, ok := r.Context.Get("error"); ok {
		return &Response{}, err.(error)
	}

	bookmark, ok := obj.(lib.Bookmark)
	if !ok {
		return &Response{}, api2go.NewHTTPError(errors.New(typeErrMsg), typeErrMsg, http.StatusBadRequest)
	}

	err := s.BookmarkStorage.Insert(&bookmark)
	if err != nil {
		return &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusInternalServerError)
	}

	return &Response{Res: bookmark, Code: http.StatusCreated}, nil
}

// Delete satisfies api2go.CRUD interface
func (s BookmarkResource) Delete(id string, r api2go.Request) (api2go.Responder, error) {
	// check for authentication error set by middleware
	if err, ok := r.Context.Get("error"); ok {
		return &Response{}, err.(error)
	}

	if err := s.BookmarkStorage.Delete(id); err != nil {
		return &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusNotFound)
	}
	return &Response{Code: http.StatusNoContent}, nil
}

// Update satisfies api2go.CRUD interface
func (s BookmarkResource) Update(obj interface{}, r api2go.Request) (api2go.Responder, error) {
	// check for authentication error set by middleware
	if err, ok := r.Context.Get("error"); ok {
		return &Response{}, err.(error)
	}

	bookmark, ok := obj.(lib.Bookmark)
	if !ok {
		return &Response{}, api2go.NewHTTPError(errors.New(typeErrMsg), typeErrMsg, http.StatusBadRequest)
	}

	if err := s.BookmarkStorage.Update(&bookmark); err != nil {
		return &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusInternalServerError)
	}

	return &Response{Res: bookmark, Code: http.StatusOK}, nil
}
