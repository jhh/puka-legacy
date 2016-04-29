package storage

import (
	"testing"

	"github.com/jhh/puka/model"
	"gopkg.in/mgo.v2/bson"
)

var oid = bson.NewObjectId()

var bookmarks = map[string]*model.Bookmark{
	oid.Hex(): &model.Bookmark{
		ID: oid,
	},
}

type MockStorage struct{}

func (s MockStorage) GetAll() (map[string]*model.Bookmark, error) {
	return bookmarks, nil
}

func (s MockStorage) GetOne(id string) (model.Bookmark, error) {
	return *bookmarks[id], nil
}

func (s MockStorage) Insert(b model.Bookmark) (bson.ObjectId, error) {
	return oid, nil
}

func (s MockStorage) Delete(id string) error {
	return nil
}

func (s MockStorage) Update(b model.Bookmark) error {
	return nil
}

func Test(t *testing.T) {
	var bm interface{} = BookmarkMemoryStorage{}
	if inty, ok := bm.(BookmarkStorage); !ok {
		t.Errorf("%v does not implement BookmarkStorage", inty)
	}
}
