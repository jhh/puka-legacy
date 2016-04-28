package storage

import "github.com/jhh/puka/model"

// BookmarkStorage abstracts database interactions.
type BookmarkStorage interface {
	GetAll() (map[string]*model.Bookmark, error)
}
