package puka

import (
	"fmt"
	"time"

	"gopkg.in/mgo.v2/bson"
)

// Bookmark stores a bookmark.
type Bookmark struct {
	ID          bson.ObjectId `bson:"_id,omitempty"`
	Title       string
	URL         string
	Description string `bson:",omitempty"`
	Timestamp   time.Time
	Tags        []string
}

func (b Bookmark) String() string {
	return fmt.Sprintln("Title:", b.Title,
		"URL:", b.URL,
		"Description:", b.Description,
		"Date:", b.Timestamp.Format(time.UnixDate),
		"Tags:", b.Tags)
}
