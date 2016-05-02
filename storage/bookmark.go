package storage

import "github.com/jhh/puka/model"

// BookmarkStorage abstracts database interactions.
type BookmarkStorage interface {
	// GetAll returns bookmarks specified by query in decending date order.
	GetAll(q Query) ([]model.Bookmark, error)

	// GetOne returns the bookmark with the specified id
	GetOne(id string) (model.Bookmark, error)

	// Insert adds a bookmark to the database
	Insert(b *model.Bookmark) error

	// Delete removes a bookmark from the database
	Delete(id string) error

	// Update modifies an existing bookmark
	Update(b *model.Bookmark) error
}
