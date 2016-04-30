package main

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"gopkg.in/mgo.v2/bson"

	"github.com/bitly/go-simplejson"
	"github.com/jhh/puka/model"
	"github.com/jhh/puka/resource"
	"github.com/jhh/puka/storage"
	"github.com/manyminds/api2go"
)

func TestCRUD(t *testing.T) {
	api := api2go.NewAPIWithBaseURL("v0", "http://localhost:31415")
	bookmarkStorage := storage.NewBookmarkMemoryStorage()
	api.AddResource(model.Bookmark{}, resource.BookmarkResource{BookmarkStorage: bookmarkStorage})

	////////////////////////////////////////////////////////////////////////
	// GET Collection
	////////////////////////////////////////////////////////////////////////
	rec := httptest.NewRecorder()
	req, err := http.NewRequest("GET", "/v0/bookmarks", nil)
	if err != nil {
		t.Error(err)
	}
	api.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Errorf("http status = %d; want: %d", rec.Code, http.StatusOK)
	}

	////////////////////////////////////////////////////////////////////////
	// POST
	////////////////////////////////////////////////////////////////////////
	rec = httptest.NewRecorder()
	req, err = http.NewRequest("POST", "/v0/bookmarks", strings.NewReader(`
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

	////////////////////////////////////////////////////////////////////////
	// GET Collection
	////////////////////////////////////////////////////////////////////////
	rec = httptest.NewRecorder()
	req, err = http.NewRequest("GET", "/v0/bookmarks", nil)
	if err != nil {
		t.Error(err)
	}
	api.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Errorf("http status = %d; want: %d", rec.Code, http.StatusOK)
	}

	////////////////////////////////////////////////////////////////////////
	// PATCH
	////////////////////////////////////////////////////////////////////////
	rec = httptest.NewRecorder()
	req, err = http.NewRequest("PATCH", "/v0/bookmarks/"+id, strings.NewReader(`
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

	js, err = simplejson.NewJson(rec.Body.Bytes())
	if err != nil {
		t.Error(err)
	}

	data = js.Get("data")

	nid := data.Get("id").MustString()
	if nid != id {
		t.Errorf("id = %q; want: %q", nid, id)
	}

	title = data.Get("attributes").Get("title").MustString()
	if title != "bar" {
		t.Errorf("title = %q; want: %q", title, "bar")
	}

	////////////////////////////////////////////////////////////////////////
	// GET One
	////////////////////////////////////////////////////////////////////////
	rec = httptest.NewRecorder()
	req, err = http.NewRequest("GET", "/v0/bookmarks/"+id, nil)
	if err != nil {
		t.Error(err)
	}
	api.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Errorf("http status = %d; want: %d", rec.Code, http.StatusOK)
	}

	////////////////////////////////////////////////////////////////////////
	// DELETE
	////////////////////////////////////////////////////////////////////////
	rec = httptest.NewRecorder()
	req, err = http.NewRequest("DELETE", "/v0/bookmarks/"+id, nil)
	if err != nil {
		t.Error(err)
	}
	api.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusNoContent {
		t.Errorf("http status = %d; want: %d", rec.Code, http.StatusOK)
	}

	////////////////////////////////////////////////////////////////////////
	// GET One
	////////////////////////////////////////////////////////////////////////
	rec = httptest.NewRecorder()
	req, err = http.NewRequest("GET", "/v0/bookmarks/"+id, nil)
	if err != nil {
		t.Error(err)
	}
	api.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusNotFound {
		t.Errorf("http status = %d; want: %d", rec.Code, http.StatusNotFound)
	}

}

func TestCRUDErrors(t *testing.T) {
	api := api2go.NewAPIWithBaseURL("v0", "http://localhost:31415")
	bookmarkStorage := storage.NewBookmarkMemoryStorage()
	api.AddResource(model.Bookmark{}, resource.BookmarkResource{BookmarkStorage: bookmarkStorage})

	////////////////////////////////////////////////////////////////////////
	// POST - wrong type in payload
	////////////////////////////////////////////////////////////////////////
	rec := httptest.NewRecorder()
	req, err := http.NewRequest("POST", "/v0/bookmarks", strings.NewReader(`
		{
			"data": {
				"type": "bogus",
				"attributes": {
					"title": "foo"
				}
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

	////////////////////////////////////////////////////////////////////////
	// DELETE - bookmark not found
	////////////////////////////////////////////////////////////////////////
	rec = httptest.NewRecorder()
	nf := bson.NewObjectId().Hex()
	req, err = http.NewRequest("DELETE", "/v0/bookmarks/"+nf, nil)
	if err != nil {
		t.Error(err)
	}
	api.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusNotFound {
		t.Errorf("http status = %d; want: %d", rec.Code, http.StatusNotFound)
	}

}
