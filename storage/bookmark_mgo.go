package storage

import (
	"os"
	"time"

	"github.com/jhh/puka/model"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// NewBookmarkMgoStorage initializes the storage
func NewBookmarkMgoStorage() (BookmarkMgoStorage, error) {
	session, err := mgo.Dial(os.Getenv("MONGODB_URI"))
	if err != nil {
		return BookmarkMgoStorage{}, err
	}
	return BookmarkMgoStorage{session: session}, nil
}

// BookmarkMgoStorage stores all users
type BookmarkMgoStorage struct {
	session *mgo.Session
}

// Close will close the master session
func (s BookmarkMgoStorage) Close() {
	s.session.Close()
}

// GetAll returns the user map (because we need the ID as key too)
func (s BookmarkMgoStorage) GetAll(q Query) ([]model.Bookmark, error) {
	session := s.session.Copy()
	defer session.Close()
	c := session.DB("").C("bookmarks")
	iter := c.Find(q.Mgo()).Sort("-timestamp").Iter()
	var result []model.Bookmark
	err := iter.All(&result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

// GetOne user
func (s BookmarkMgoStorage) GetOne(id string) (model.Bookmark, error) {
	session := s.session.Copy()
	defer session.Close()
	c := session.DB("").C("bookmarks")
	var result model.Bookmark
	err := c.FindId(bson.ObjectIdHex(id)).One(&result)
	if err != nil {
		return model.Bookmark{}, err
	}
	return result, nil
}

// Insert a user and set Timestamp to insert time if not already set.
func (s BookmarkMgoStorage) Insert(b *model.Bookmark) error {
	id := bson.NewObjectId()
	b.ID = id

	if b.Timestamp.IsZero() {
		b.Timestamp = time.Now()
	}

	session := s.session.Copy()
	defer session.Close()
	c := session.DB("").C("bookmarks")
	err := c.Insert(b)
	return err
}

// Delete one :(
func (s BookmarkMgoStorage) Delete(id string) error {
	session := s.session.Copy()
	defer session.Close()
	c := session.DB("").C("bookmarks")
	err := c.RemoveId(bson.ObjectIdHex(id))
	return err
}

// Update a user and updates Timestamp.
func (s BookmarkMgoStorage) Update(b *model.Bookmark) error {
	session := s.session.Copy()
	defer session.Close()
	c := session.DB("").C("bookmarks")
	b.Timestamp = time.Now()
	err := c.UpdateId(b.ID, b)
	return err
}
