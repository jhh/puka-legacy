package storage

import "github.com/jhh/puka/model"

// BookmarkStorage abstracts database interactions.
type BookmarkStorage interface {
	// GetAll returns bookmarks specified by query in decending date order.
	GetAll(q Query) ([]model.Bookmark, error)

	// GetPage returns a portion of bookmarks specified by query.
	GetPage(q Query, skip, limit int) ([]model.Bookmark, error)

	// Count returns the total number of bookmarks specified by query.
	Count(q Query) (int, error)

	// GetOne returns the bookmark with the specified id
	GetOne(id string) (model.Bookmark, error)

	// Insert adds a bookmark to the database
	Insert(b *model.Bookmark) error

	// Delete removes a bookmark from the database
	Delete(id string) error

	// Update modifies an existing bookmark
	Update(b *model.Bookmark) error
}
