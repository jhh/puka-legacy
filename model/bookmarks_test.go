package model

import (
	"bytes"
	"encoding/json"
	"os"
	"testing"
	"time"

	"github.com/manyminds/api2go/jsonapi"

	"gopkg.in/mgo.v2/bson"
)

func TestGetID(t *testing.T) {
	id := bson.NewObjectId()
	b := Bookmark{ID: id}
	if b.GetID() != id.Hex() {
		t.Errorf("expected %q, got %q", id.Hex(), b.GetID())
	}
}

func TestSetID(t *testing.T) {
	b := Bookmark{}
	err := b.SetID("bogus id string")
	if err == nil {
		t.Error("expected error for bogus id string")
	}

	err = b.SetID("")
	if err == nil {
		t.Error("expected error for empty id string")
	}

	err = b.SetID(bson.NewObjectId().Hex())
	if err != nil {
		t.Error(err)
	}
}

func ExampleBookmark() {
	timestamp := time.Date(2009, time.November, 10, 23, 0, 0, 0, time.UTC)
	b := Bookmark{
		Title:       "The Title",
		URL:         "http://example.com",
		Description: "A Description.",
		Timestamp:   timestamp,
		Tags:        []string{"foo", "bar"},
	}
	b.SetID("572135023cd994201b0bb61c")
	result, err := jsonapi.Marshal(b)
	if err != nil {
		return
	}
	var out bytes.Buffer
	json.Indent(&out, result, "", "  ")
	out.WriteTo(os.Stdout)
	// Output:
	// {
	//   "data": {
	//     "type": "bookmarks",
	//     "id": "572135023cd994201b0bb61c",
	//     "attributes": {
	//       "title": "The Title",
	//       "url": "http://example.com",
	//       "description": "A Description.",
	//       "timestamp": "2009-11-10T23:00:00Z",
	//       "tags": [
	//         "foo",
	//         "bar"
	//       ]
	//     }
	//   }
	// }
}
