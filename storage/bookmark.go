package storage

import (
	"github.com/jhh/puka/model"
	"gopkg.in/mgo.v2/bson"
)

// BookmarkStorage abstracts database interactions.
type BookmarkStorage interface {
	GetAll() (map[string]*model.Bookmark, error)
	GetOne(id string) (model.Bookmark, error)
	Insert(b model.Bookmark) (bson.ObjectId, error)
	Delete(id string) error
	Update(b model.Bookmark) error
}
