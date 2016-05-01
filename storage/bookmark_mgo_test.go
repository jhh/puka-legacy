package storage

import (
	"log"
	"os"
	"testing"

	"github.com/manyminds/api2go"
)

var storage BookmarkMgoStorage

func TestMain(m *testing.M) {
	if os.Getenv("MONGODB_URI") == "" {
		if err := os.Setenv("MONGODB_URI", "mongodb://localhost/test"); err != nil {
			log.Fatal(err)
		}
	}
	var err error
	storage, err = NewBookmarkMgoStorage()
	if err != nil {
		log.Fatal(err)
	}
	code := m.Run()
	storage.Close()
	os.Exit(code)
}

func TestGetAll(t *testing.T) {
	r, err := storage.GetAll(Query{})
	if err != nil {
		t.Error(err)
	}
	if len(r) == 0 {
		t.Error("len = 0; want: > 0")
	}
}

func TestGetAllWithTag(t *testing.T) {
	req := api2go.Request{
		QueryParams: map[string][]string{
			"filter[tag]": []string{"rocks"},
		},
	}
	r, err := storage.GetAll(NewQuery(req))
	if err != nil {
		t.Error(err)
	}
	if len(r) == 0 {
		t.Error("len = 0; want: > 0")
	}
}
