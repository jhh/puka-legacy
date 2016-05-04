package main

import (
	"flag"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
	"time"

	"gopkg.in/mgo.v2/bson"

	"github.com/bitly/go-simplejson"
	"github.com/jhh/puka/middleware"
	"github.com/jhh/puka/model"
	"github.com/jhh/puka/resource"
	"github.com/jhh/puka/storage"
	"github.com/manyminds/api2go"
)

var (
	api      *api2go.API
	bookmark model.Bookmark
)

func TestMain(m *testing.M) {
	flag.Parse()
	var bms storage.BookmarkStorage
	if testing.Short() {
		log.Println("Using BookmarkMemoryStorage for testing.")
		bms = storage.NewBookmarkMemoryStorage()
	} else {
		log.Println("Using BookmarkMgoStorage for testing.")
		if os.Getenv("MONGODB_URI") == "" {
			if err := os.Setenv("MONGODB_URI", "mongodb://localhost/test"); err != nil {
				log.Fatal(err)
			}
			var err error
			bms, err = storage.NewBookmarkMgoStorage()
			if err != nil {
				log.Fatal(err)
			}
		}
	}
	api = api2go.NewAPIWithBaseURL("v0", "http://localhost:31415")
	api.UseMiddleware(middleware.Authenticate)
	api.AddResource(model.Bookmark{}, resource.BookmarkResource{BookmarkStorage: bms})
	bookmarks, err := bms.GetAll(storage.Query{})
	if err != nil {
		log.Fatal(err)
	}
	l := len(bookmarks)
	if l == 0 {
		log.Fatal("len(bookmarks) = 0 in test data")
	}
	rand.Seed(time.Now().UnixNano())
	bookmark = bookmarks[rand.Intn(l)]
	os.Exit(m.Run())
}

func TestGetAll(t *testing.T) {
	rec := httptest.NewRecorder()
	req, err := http.NewRequest("GET", "/v0/bookmarks", nil)
	if err != nil {
		t.Error(err)
	}
	api.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Errorf("http status = %d; want: %d", rec.Code, http.StatusOK)
	}
}

func TestCreate(t *testing.T) {
	rec := httptest.NewRecorder()
	req, err := http.NewRequest("POST", "/v0/bookmarks", strings.NewReader(`
		{
			"data": {
				"type": "bookmarks",
				"attributes": {
				"title": "foo"
				}
			}
		}
	`))
	if err != nil {
		t.Error(err)
	}

	api.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusCreated {
		t.Errorf("http status = %d; want: %d", rec.Code, http.StatusCreated)
	}

	js, err := simplejson.NewJson(rec.Body.Bytes())
	if err != nil {
		t.Error(err)
	}

	data := js.Get("data")
	typ := data.Get("type").MustString()
	if typ != "bookmarks" {
		t.Errorf("type = %q; want: %q", typ, "foo")
	}

	id := data.Get("id").MustString()
	if !bson.IsObjectIdHex(id) {
		t.Errorf("id = %q is not ObjectId", id)
	}

	title := data.Get("attributes").Get("title").MustString()
	if title != "foo" {
		t.Errorf("title = %q; want: %q", title, "foo")
	}

	//Fetch again and compare
	rec = httptest.NewRecorder()
	req, err = http.NewRequest("GET", "/v0/bookmarks/"+id, nil)
	if err != nil {
		t.Error(err)
	}
	api.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Errorf("http status = %d; want: %d", rec.Code, http.StatusOK)
	}
	js, err = simplejson.NewJson(rec.Body.Bytes())
	if err != nil {
		t.Error(err)
	}
	data = js.Get("data")
	title = data.Get("attributes").Get("title").MustString()
	if title != "foo" {
		t.Errorf("title = %q; want: %q", title, "foo")
	}

}

func TestPatch(t *testing.T) {
	rec := httptest.NewRecorder()
	id := bookmark.GetID()
	req, err := http.NewRequest("PATCH", "/v0/bookmarks/"+id, strings.NewReader(`
		{
			"data": {
				"type": "bookmarks",
				"attributes": {
					"title": "bar"
				}
			}
		}
		`))
	if err != nil {
		t.Error(err)
	}
	api.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Errorf("http status = %d; want: %d", rec.Code, http.StatusOK)
	}

	js, err := simplejson.NewJson(rec.Body.Bytes())
	if err != nil {
		t.Error(err)
	}

	data := js.Get("data")

	nid := data.Get("id").MustString()
	if nid != id {
		t.Errorf("id = %q; want: %q", nid, id)
	}

	title := data.Get("attributes").Get("title").MustString()
	if title != "bar" {
		t.Errorf("title = %q; want: %q", title, "bar")
	}

	//Fetch again and compare
	rec = httptest.NewRecorder()
	fmt.Printf("GET /v0/bookmarks/%s\n", id)
	req, err = http.NewRequest("GET", "/v0/bookmarks/"+id, nil)
	if err != nil {
		t.Error(err)
	}
	api.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Fatalf("http status = %d; want: %d", rec.Code, http.StatusOK)
	}
	fmt.Println("BODY", rec.Body.String())
	js, err = simplejson.NewJson(rec.Body.Bytes())
	if err != nil {
		t.Error(err)
	}
	data = js.Get("data")
	title = data.Get("attributes").Get("title").MustString()
	if title != "bar" {
		t.Errorf("title = %q; want: %q", title, "bar")
	}
}

func TestDelete(t *testing.T) {
	// Create bookmark to delete
	rec := httptest.NewRecorder()
	req, err := http.NewRequest("POST", "/v0/bookmarks", strings.NewReader(`
		{
			"data": {
				"type": "bookmarks"
			}
		}
	`))
	if err != nil {
		t.Error(err)
	}

	api.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusCreated {
		t.Errorf("http status = %d; want: %d", rec.Code, http.StatusCreated)
	}

	js, err := simplejson.NewJson(rec.Body.Bytes())
	if err != nil {
		t.Error(err)
	}

	id := js.Get("data").Get("id").MustString()
	if !bson.IsObjectIdHex(id) {
		t.Errorf("id = %q is not ObjectId", id)
	}

	// Now delete bookmark with id from above
	rec = httptest.NewRecorder()
	req, err = http.NewRequest("DELETE", "/v0/bookmarks/"+id, nil)
	if err != nil {
		t.Error(err)
	}
	api.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusNoContent {
		t.Errorf("http status = %d; want: %d", rec.Code, http.StatusOK)
	}

	// Should be really gone
	rec = httptest.NewRecorder()
	req, err = http.NewRequest("GET", "/v0/bookmarks/"+id, nil)
	if err != nil {
		t.Error(err)
	}
	api.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusNotFound {
		t.Errorf("http status = %d; want: %d", rec.Code, http.StatusNotFound)
	}
	js, err = simplejson.NewJson(rec.Body.Bytes())
	if err != nil {
		t.Error(err)
	}
}

func TestTypeError(t *testing.T) {
	rec := httptest.NewRecorder()
	req, err := http.NewRequest("POST", "/v0/bookmarks", strings.NewReader(`
		{
			"data": {
				"type": "bogus"
			}
		}
		`))
	if err != nil {
		t.Error(err.Error())
	}

	api.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusNotAcceptable {
		t.Errorf("http status = %d; want: %d", rec.Code, http.StatusNotAcceptable)
	}
}

func TestDeleteNotFoundError(t *testing.T) {
	rec := httptest.NewRecorder()
	nf := bson.NewObjectId().Hex()
	req, err := http.NewRequest("DELETE", "/v0/bookmarks/"+nf, nil)
	if err != nil {
		t.Error(err)
	}
	api.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusNotFound {
		t.Errorf("http status = %d; want: %d", rec.Code, http.StatusNotFound)
	}

}
