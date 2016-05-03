package resource

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/jhh/puka/model"
	"github.com/jhh/puka/storage"
	"github.com/manyminds/api2go"
)

const typeErrMsg = "Invalid instance given"

// The BookmarkResource struct implements api2go routes
type BookmarkResource struct {
	BookmarkStorage storage.BookmarkStorage
}

// FindAll satisfies api2go.FindAll interface
func (s BookmarkResource) FindAll(r api2go.Request) (api2go.Responder, error) {
	bookmarks, err := s.BookmarkStorage.GetAll(storage.NewQuery(r))
	if err != nil {
		return &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusInternalServerError)
	}
	return &Response{Res: bookmarks, Code: http.StatusOK}, nil
}

// PaginatedFindAll satisfies the api2go.PaginatedFindAll interface
func (s BookmarkResource) PaginatedFindAll(req api2go.Request) (uint, api2go.Responder, error) {
	var (
		numberStr, sizeStr, offsetStr, limitStr string
		skip, limit                             int
	)

	if numberQuery, ok := req.QueryParams["page[number]"]; ok {
		numberStr = numberQuery[0]
	}
	if sizeQuery, ok := req.QueryParams["page[size]"]; ok {
		sizeStr = sizeQuery[0]
	}
	if offsetQuery, ok := req.QueryParams["page[offset]"]; ok {
		offsetStr = offsetQuery[0]
	}
	if limitQuery, ok := req.QueryParams["page[limit]"]; ok {
		limitStr = limitQuery[0]
	}

	if sizeStr != "" {
		si, err := strconv.Atoi(sizeStr)
		if err != nil {
			return 0, &Response{}, err
		}
		ni, err := strconv.Atoi(numberStr)
		if err != nil {
			return 0, &Response{}, err
		}
		skip = si * (ni - 1)
		limit = si

	} else {
		var err error
		skip, err = strconv.Atoi(offsetStr)
		if err != nil {
			return 0, &Response{}, err
		}
		limit, err = strconv.Atoi(limitStr)
		if err != nil {
			return 0, &Response{}, err
		}
	}

	q := storage.NewQuery(req)
	count, err := s.BookmarkStorage.Count(q)
	if err != nil {
		return 0, &Response{}, err
	}
	bookmarks, err := s.BookmarkStorage.GetPage(q, skip, limit)
	if err != nil {
		return 0, &Response{}, err
	}

	// total count, response, error
	return uint(count), &Response{Res: bookmarks, Code: http.StatusOK}, nil
}

// FindOne satisfies api2go.CRUD interface
func (s BookmarkResource) FindOne(id string, r api2go.Request) (api2go.Responder, error) {
	bookmark, err := s.BookmarkStorage.GetOne(id)
	if err != nil {
		return &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusNotFound)
	}
	return &Response{Res: bookmark, Code: http.StatusOK}, nil
}

// Create satisfies api2go.CRUD interface
func (s BookmarkResource) Create(obj interface{}, r api2go.Request) (api2go.Responder, error) {
	bookmark, ok := obj.(model.Bookmark)
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
	if err := s.BookmarkStorage.Delete(id); err != nil {
		return &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusNotFound)
	}
	return &Response{Code: http.StatusNoContent}, nil
}

// Update satisfies api2go.CRUD interface
func (s BookmarkResource) Update(obj interface{}, r api2go.Request) (api2go.Responder, error) {
	bookmark, ok := obj.(model.Bookmark)
	if !ok {
		return &Response{}, api2go.NewHTTPError(errors.New(typeErrMsg), typeErrMsg, http.StatusBadRequest)
	}

	if err := s.BookmarkStorage.Update(&bookmark); err != nil {
		return &Response{}, api2go.NewHTTPError(err, err.Error(), http.StatusInternalServerError)
	}

	return &Response{Res: bookmark, Code: http.StatusOK}, nil
}
