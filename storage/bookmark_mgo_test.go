package storage

import (
	"compress/gzip"
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"testing"

	"github.com/jhh/puka/model"
	"github.com/manyminds/api2go"
)

var (
	storage BookmarkMgoStorage
	oid     string
)

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
	loadTestData()
	code := m.Run()
	storage.Close()
	os.Exit(code)
}

func TestGetAll(t *testing.T) {
	r, err := storage.GetAll(Query{})
	if err != nil {
		t.Error(err)
	}
	if len(r) != 1000 {
		t.Errorf("len = %d; want: 1000", len(r))
	}
}

func TestGetAllWithTag(t *testing.T) {
	req := api2go.Request{
		QueryParams: map[string][]string{
			"filter[tag]": []string{"go"},
		},
	}
	r, err := storage.GetAll(NewQuery(req))
	if err != nil {
		t.Error(err)
	}
	if len(r) != 370 {
		t.Errorf("len = %d; want: 370", len(r))
	}
}

func TestGetOne(t *testing.T) {
	bm, err := storage.GetOne(oid)
	if err != nil {
		t.Error(err)
	}
	if bm.GetID() != oid {
		t.Errorf("id = %q; want: %q", bm.GetID(), oid)
	}
}

func loadTestData() {
	fi, err := os.Open("testdata/bookmarks.json.gz")
	if err != nil {
		log.Fatal(err)
	}
	defer fi.Close()
	gz, err := gzip.NewReader(fi)
	if err != nil {
		log.Fatal(err)
	}
	b, err := ioutil.ReadAll(gz)
	if err != nil {
		log.Fatal(err)
	}
	var bookmarks []model.Bookmark
	err = json.Unmarshal(b, &bookmarks)
	if err != nil {
		log.Fatal(err)
	}

	session := storage.session.Copy()
	defer session.Close()

	col := session.DB("").C("bookmarks")
	err = col.DropCollection()
	if err != nil {
		log.Println(err)
	}
	bulk := col.Bulk()
	for _, bm := range bookmarks {
		bulk.Insert(bm)
	}
	_, err = bulk.Run()
	if err != nil {
		log.Fatal(err)
	}
	var bm model.Bookmark
	err = col.Find(nil).One(&bm)
	if err != nil {
		log.Fatal(err)
	}
	oid = bm.GetID()
}
