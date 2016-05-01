package storage

import (
	"errors"
	"fmt"
	"net/http"

	"gopkg.in/mgo.v2/bson"

	"github.com/jhh/puka/model"
	"github.com/manyminds/api2go"
)

// NewBookmarkMemoryStorage initializes the storage
func NewBookmarkMemoryStorage() *BookmarkMemoryStorage {
	return &BookmarkMemoryStorage{make(map[string]*model.Bookmark)}
}

// BookmarkMemoryStorage stores all users
type BookmarkMemoryStorage struct {
	bookmarks map[string]*model.Bookmark
}

// GetAll returns the user map (because we need the ID as key too)
func (s BookmarkMemoryStorage) GetAll(q Query) ([]model.Bookmark, error) {
	result := make([]model.Bookmark, 0, len(s.bookmarks))
	for _, val := range s.bookmarks {
		result = append(result, *val)
	}
	return result, nil
}

// GetOne user
func (s BookmarkMemoryStorage) GetOne(id string) (model.Bookmark, error) {
	user, ok := s.bookmarks[id]
	if ok {
		return *user, nil
	}
	errMessage := fmt.Sprintf("Bookmark for id %s not found", id)
	return model.Bookmark{}, api2go.NewHTTPError(errors.New(errMessage), errMessage, http.StatusNotFound)
}

// Insert a user
func (s BookmarkMemoryStorage) Insert(b model.Bookmark) (bson.ObjectId, error) {
	id := bson.NewObjectId()
	b.ID = id
	s.bookmarks[id.Hex()] = &b
	return id, nil
}

// Delete one :(
func (s BookmarkMemoryStorage) Delete(id string) error {
	_, exists := s.bookmarks[id]
	if !exists {
		return fmt.Errorf("Bookmark with id %s does not exist", id)
	}
	delete(s.bookmarks, id)

	return nil
}

// Update a user
func (s BookmarkMemoryStorage) Update(b model.Bookmark) error {
	_, exists := s.bookmarks[b.ID.Hex()]
	if !exists {
		return fmt.Errorf("Bookmark with id %s does not exist", b.ID)
	}
	s.bookmarks[b.ID.Hex()] = &b

	return nil
}
