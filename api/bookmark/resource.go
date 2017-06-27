package bookmark // import "jhhgo.us/pukaws/bookmark"

import (
	"errors"
	"net/http"

	"github.com/manyminds/api2go"
)

const typeErrMsg = "Invalid instance given"

// The Resource struct implements api2go routes.
type Resource struct {
	Storage Storage
}

// FindAll satisfies api2go.FindAll interface
func (s Resource) FindAll(r api2go.Request) (api2go.Responder, error) {
	// check for authentication error set by middleware
	if err, ok := r.Context.Get("error"); ok {
		return &Response{}, err.(error)
	}
	bookmarks, err := s.Storage.GetAll(NewQuery(r))
	if err != nil {
		return &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusInternalServerError)
	}
	return &Response{Res: bookmarks, Code: http.StatusOK}, nil
}

// PaginatedFindAll satisfies the api2go.PaginatedFindAll interface
func (s Resource) PaginatedFindAll(r api2go.Request) (uint, api2go.Responder, error) {
	// check for authentication error set by middleware
	if err, ok := r.Context.Get("error"); ok {
		return 0, &Response{}, err.(error)
	}

	p, err := NewPaginator(r)
	if err != nil {
		return 0, &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusBadRequest)
	}
	q := NewQuery(r)
	count, err := s.Storage.Count(q)
	if err != nil {
		return 0, &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusInternalServerError)
	}
	bookmarks, err := s.Storage.GetPage(q, p.Skip, p.Limit)
	if err != nil {
		return 0, &Response{}, err
	}

	// total count, response, error
	return uint(count), &Response{Res: bookmarks, Code: http.StatusOK}, nil
}

// FindOne satisfies api2go.CRUD interface
func (s Resource) FindOne(id string, r api2go.Request) (api2go.Responder, error) {
	// check for authentication error set by middleware
	if err, ok := r.Context.Get("error"); ok {
		return &Response{}, err.(error)
	}

	bookmark, err := s.Storage.GetOne(id)
	if err != nil {
		return &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusNotFound)
	}
	return &Response{Res: bookmark, Code: http.StatusOK}, nil
}

// Create satisfies api2go.CRUD interface
func (s Resource) Create(obj interface{}, r api2go.Request) (api2go.Responder, error) {
	// check for authentication error set by middleware
	if err, ok := r.Context.Get("error"); ok {
		return &Response{}, err.(error)
	}

	bookmark, ok := obj.(Bookmark)
	if !ok {
		return &Response{}, api2go.NewHTTPError(errors.New(typeErrMsg), typeErrMsg, http.StatusBadRequest)
	}

	err := s.Storage.Insert(&bookmark)
	if err != nil {
		return &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusInternalServerError)
	}

	return &Response{Res: bookmark, Code: http.StatusCreated}, nil
}

// Delete satisfies api2go.CRUD interface
func (s Resource) Delete(id string, r api2go.Request) (api2go.Responder, error) {
	// check for authentication error set by middleware
	if err, ok := r.Context.Get("error"); ok {
		return &Response{}, err.(error)
	}

	if err := s.Storage.Delete(id); err != nil {
		return &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusNotFound)
	}
	return &Response{Code: http.StatusNoContent}, nil
}

// Update satisfies api2go.CRUD interface
func (s Resource) Update(obj interface{}, r api2go.Request) (api2go.Responder, error) {
	// check for authentication error set by middleware
	if err, ok := r.Context.Get("error"); ok {
		return &Response{}, err.(error)
	}

	bookmark, ok := obj.(Bookmark)
	if !ok {
		return &Response{}, api2go.NewHTTPError(errors.New(typeErrMsg), typeErrMsg, http.StatusBadRequest)
	}

	if err := s.Storage.Update(&bookmark); err != nil {
		return &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusInternalServerError)
	}

	return &Response{Res: bookmark, Code: http.StatusOK}, nil
}
