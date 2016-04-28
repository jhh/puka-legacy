package resource

import (
	"errors"

	"github.com/jhh/puka/storage"
	"github.com/manyminds/api2go"
)

// The BookmarkResource struct implements api2go routes
type BookmarkResource struct {
	// TODO: confirm this works when not a point to BookmarkStorage
	BookmarkStorage storage.BookmarkStorage
}

// FindAll satisfies api2go.FindAll interface
func (s BookmarkResource) FindAll(r api2go.Request) (api2go.Responder, error) {
	return &Response{}, errors.New("unimplemented")
}

// FindOne satisfies api2go.CRUD interface
func (s BookmarkResource) FindOne(ID string, r api2go.Request) (api2go.Responder, error) {
	return &Response{}, errors.New("unimplemented")
}

// Create satisfies api2go.CRUD interface
func (s BookmarkResource) Create(obj interface{}, r api2go.Request) (api2go.Responder, error) {
	return &Response{}, errors.New("unimplemented")
}

// Delete satisfies api2go.CRUD interface
func (s BookmarkResource) Delete(id string, r api2go.Request) (api2go.Responder, error) {
	return &Response{}, errors.New("unimplemented")
}

// Update satisfies api2go.CRUD interface
func (s BookmarkResource) Update(obj interface{}, r api2go.Request) (api2go.Responder, error) {
	return &Response{}, errors.New("unimplemented")
}
