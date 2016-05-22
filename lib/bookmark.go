package lib // import "jhhgo.us/pukaws/lib"

import (
	"errors"
	"fmt"
	"time"

	"gopkg.in/mgo.v2/bson"
)

// Bookmark represents a bookmark.
type Bookmark struct {
	ID          bson.ObjectId `json:"-" bson:"_id,omitempty"`
	Title       string        `json:"title"`
	URL         string        `json:"url"`
	Description string        `json:"description" bson:",omitempty"`
	Timestamp   time.Time     `json:"timestamp"`
	Tags        []string      `json:"tags"`
}

// GetID to satisfy jsonapi.MarshalIdentifier interface
func (b Bookmark) GetID() string {
	return b.ID.Hex()
}

// SetID to satisfy jsonapi.UnmarshalIdentifier interface
func (b *Bookmark) SetID(id string) error {
	if bson.IsObjectIdHex(id) {
		b.ID = bson.ObjectIdHex(id)
		return nil
	}
	return errors.New("can't convert \"" + id + "\" to ObjectId")
}

func (b Bookmark) String() string {
	return fmt.Sprintln(
		"\nID:", b.GetID(),
		"\nTitle:", b.Title,
		"\nURL:", b.URL,
		"\nDescription:", b.Description,
		"\nDate:", b.Timestamp.Format(time.UnixDate),
		"\nTags:", b.Tags)
}
