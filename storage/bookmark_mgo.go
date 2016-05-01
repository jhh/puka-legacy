package storage

import (
	"os"

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
	sess := s.session.Copy()
	defer sess.Close()
	c := sess.DB("").C("bookmarks")
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
	return model.Bookmark{}, nil
	// errMessage := fmt.Sprintf("Bookmark for id %s not found", id)
	// return model.Bookmark{}, api2go.NewHTTPError(errors.New(errMessage), errMessage, http.StatusNotFound)
}

// Insert a user
func (s BookmarkMgoStorage) Insert(b model.Bookmark) (bson.ObjectId, error) {
	id := bson.NewObjectId()
	b.ID = id
	return id, nil
}

// Delete one :(
func (s BookmarkMgoStorage) Delete(id string) error {
	return nil
}

// Update a user
func (s BookmarkMgoStorage) Update(b model.Bookmark) error {
	return nil
}
