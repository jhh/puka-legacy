package bookmark // import "github.com/jhh/puka/api/bookmark"

import (
	"time"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// NewMgoStorage initializes the storage
func NewMgoStorage(uri string) (MgoStorage, error) {
	session, err := mgo.Dial(uri)
	if err != nil {
		return MgoStorage{}, err
	}
	return MgoStorage{session: session}, nil
}

// MgoStorage stores all users
type MgoStorage struct {
	session *mgo.Session
}

// Close will close the master session
func (s MgoStorage) Close() {
	s.session.Close()
}

// GetAll returns the bookmarks specified by query.
func (s MgoStorage) GetAll(q Query) ([]Bookmark, error) {
	session := s.session.Copy()
	defer session.Close()
	c := session.DB("").C("bookmarks")
	iter := c.Find(q.Mgo()).Sort("-timestamp").Iter()
	var result []Bookmark
	err := iter.All(&result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

// GetPage returns a portion of bookmarks specified by query.
func (s MgoStorage) GetPage(q Query, skip, limit int) ([]Bookmark, error) {
	session := s.session.Copy()
	defer session.Close()
	c := session.DB("").C("bookmarks")
	iter := c.Find(q.Mgo()).Sort("-timestamp").Skip(skip).Limit(limit).Iter()
	var result []Bookmark
	err := iter.All(&result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

// Count returns the total number of bookmarks specified by query.
func (s MgoStorage) Count(q Query) (int, error) {
	session := s.session.Copy()
	defer session.Close()
	c := session.DB("").C("bookmarks")
	n, err := c.Find(q.Mgo()).Count()
	return n, err
}

// GetOne user
func (s MgoStorage) GetOne(id string) (Bookmark, error) {
	session := s.session.Copy()
	defer session.Close()
	c := session.DB("").C("bookmarks")
	var result Bookmark
	err := c.FindId(bson.ObjectIdHex(id)).One(&result)
	if err != nil {
		return Bookmark{}, err
	}
	return result, nil
}

// Insert a user and set Timestamp to insert time if not already set.
func (s MgoStorage) Insert(b *Bookmark) error {
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
func (s MgoStorage) Delete(id string) error {
	session := s.session.Copy()
	defer session.Close()
	c := session.DB("").C("bookmarks")
	err := c.RemoveId(bson.ObjectIdHex(id))
	return err
}

// Update a user and updates Timestamp.
func (s MgoStorage) Update(b *Bookmark) error {
	session := s.session.Copy()
	defer session.Close()
	c := session.DB("").C("bookmarks")
	b.Timestamp = time.Now()
	err := c.UpdateId(b.ID, b)
	return err
}
