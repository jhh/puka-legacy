package lib

import (
	"bytes"
	"encoding/json"
	"log"
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
		t.Errorf("GetID() = %q; want: %q", b.GetID(), id.Hex())
	}
}

func TestSetID(t *testing.T) {
	b := Bookmark{}
	err := b.SetID("bogus id string")
	if err == nil {
		t.Error("err = nil")
	}

	err = b.SetID("")
	if err == nil {
		t.Error("err = nil")
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
	if err := b.SetID("572135023cd994201b0bb61c"); err != nil {
		log.Fatal(err)
	}
	result, err := jsonapi.Marshal(b)
	if err != nil {
		return
	}
	var out bytes.Buffer
	if err := json.Indent(&out, result, "", "  "); err != nil {
		log.Fatal(err)
	}
	if _, err := out.WriteTo(os.Stdout); err != nil {
		log.Fatal(err)
	}
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
