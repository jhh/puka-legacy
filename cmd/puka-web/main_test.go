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
	rec := httptest.NewRecorder()

	////////////////////////////////////////////////////////////////////////
	// POST
	////////////////////////////////////////////////////////////////////////
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
		t.Errorf("expected %d, got: %d", http.StatusCreated, rec.Code)
	}

	js, err := simplejson.NewJson(rec.Body.Bytes())
	if err != nil {
		t.Error(err)
	}

	data := js.Get("data")
	typ := data.Get("type").MustString()
	if typ != "bookmarks" {
		t.Errorf("expected: %q, got: %q", "foo", typ)
	}

	id := data.Get("id").MustString()
	if !bson.IsObjectIdHex(id) {
		t.Errorf("expected id to be ObjectId, got: %q", id)
	}

	title := data.Get("attributes").Get("title").MustString()
	if title != "foo" {
		t.Errorf("expected: %q, got: %q", "foo", title)
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
		t.Errorf("expected %d, got: %d", http.StatusOK, rec.Code)
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
		t.Errorf("expected %d, got: %d", http.StatusOK, rec.Code)
	}

	js, err = simplejson.NewJson(rec.Body.Bytes())
	if err != nil {
		t.Error(err)
	}

	data = js.Get("data")

	nid := data.Get("id").MustString()
	if nid != id {
		t.Errorf("expected: %q, got: %q", id, nid)
	}

	title = data.Get("attributes").Get("title").MustString()
	if title != "bar" {
		t.Errorf("expected: %q, got: %q", "bar", title)
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
		t.Errorf("expected %d, got: %d", http.StatusOK, rec.Code)
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
		t.Errorf("expected %d, got: %d", http.StatusOK, rec.Code)
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
		t.Errorf("expected %d, got: %d", http.StatusNotFound, rec.Code)
	}

}
