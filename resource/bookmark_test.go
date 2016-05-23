package resource // import "jhhgo.us/pukaws/resource"

import (
	"errors"
	"fmt"
	"net/http"
	"testing"

	"gopkg.in/mgo.v2/bson"

	"github.com/manyminds/api2go"
	"jhhgo.us/pukaws/model"
	"jhhgo.us/pukaws/storage"
)

var oid = bson.NewObjectId()

var bookmarks = []lib.Bookmark{
	lib.Bookmark{
		ID: oid,
	},
}

// BookmarkResource uses Request.Context for authentication error checks.
var request = api2go.Request{
	Context: &api2go.APIContext{},
}

type MockStorage struct{}

func (s MockStorage) GetAll(_ storage.Query) ([]lib.Bookmark, error) {
	return bookmarks, nil
}

func (s MockStorage) GetPage(_ storage.Query, skip, limit int) ([]lib.Bookmark, error) {
	return []lib.Bookmark{}, errors.New("not implemented")
}

func (s MockStorage) Count(_ storage.Query) (int, error) {
	return len(bookmarks), nil
}

func (s MockStorage) GetOne(id string) (lib.Bookmark, error) {
	return bookmarks[0], nil
}

func (s MockStorage) Insert(b *lib.Bookmark) error {
	b.ID = oid
	return nil
}

func (s MockStorage) Delete(id string) error {
	return nil
}

func (s MockStorage) Update(b *lib.Bookmark) error {
	return nil
}

func TestFindAll(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &MockStorage{}}
	response, _ := bmr.FindAll(request)
	if invalid, msg := checkBookmark(response); invalid {
		t.Error(msg)
	}
}

func TestFindOne(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &MockStorage{}}
	response, _ := bmr.FindOne(oid.Hex(), request)
	if invalid, msg := checkBookmark(response); invalid {
		t.Error(msg)
	}
}

func TestCreate(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &MockStorage{}}
	response, _ := bmr.Create(lib.Bookmark{}, request)
	if invalid, msg := checkBookmark(response); invalid {
		t.Error(msg)
	}
}

func TestDelete(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &MockStorage{}}
	response, _ := bmr.Delete(oid.Hex(), request)
	if response.StatusCode() != http.StatusNoContent {
		t.Errorf("http status = %v; want: %v", response.StatusCode(), http.StatusNoContent)
	}
}

func TestUpdate(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &MockStorage{}}
	response, _ := bmr.Update(lib.Bookmark{}, request)
	if invalid, msg := checkBookmark(response); invalid {
		t.Error(msg)
	}
}

type ErrorStorage struct{}

func (s ErrorStorage) GetAll(_ storage.Query) ([]lib.Bookmark, error) {
	return nil, errors.New("expected")
}

func (s ErrorStorage) GetPage(_ storage.Query, skip, limit int) ([]lib.Bookmark, error) {
	return []lib.Bookmark{}, errors.New("not implemented")
}

func (s ErrorStorage) Count(_ storage.Query) (int, error) {
	return 0, errors.New("expected")
}

func (s ErrorStorage) GetOne(id string) (lib.Bookmark, error) {
	return lib.Bookmark{}, errors.New("expected")
}

func (s ErrorStorage) Insert(b *lib.Bookmark) error {
	return errors.New("expected")
}

func (s ErrorStorage) Delete(id string) error {
	return errors.New("expected")
}

func (s ErrorStorage) Update(b *lib.Bookmark) error {
	return errors.New("expected")
}

func TestFindAllError(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &ErrorStorage{}}
	response, err := bmr.FindAll(request)
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
}

func TestFindOneError(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &ErrorStorage{}}
	response, err := bmr.FindOne("", request)
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
}

func TestCreateError(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &ErrorStorage{}}
	response, err := bmr.Create("", request)
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
	response, err = bmr.Create(lib.Bookmark{}, request)
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
}

func TestDeleteError(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &ErrorStorage{}}
	response, err := bmr.Delete(oid.Hex(), request)
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
}

func TestUpdateError(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &ErrorStorage{}}
	response, err := bmr.Update("", request)
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
	response, err = bmr.Update(lib.Bookmark{}, request)
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
}

func checkBookmark(r api2go.Responder) (bool, string) {
	result := r.Result()
	if bma, ok := result.([]lib.Bookmark); ok {
		bm := bma[0]
		if bm.ID != oid {
			return true, fmt.Sprintf("id = %v; wanted: %v", bm.ID, oid)
		}
	}
	return false, ""
}

func checkError(r api2go.Responder, err error) (bool, string) {
	if res, ok := r.(*Response); !ok {
		return true, fmt.Sprintf("res = %v; want: %v", res, &Response{})
	}
	if err == nil {
		return true, fmt.Sprint("err = nil")
	}
	return false, ""
}
