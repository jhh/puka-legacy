package resource

import (
	"errors"
	"fmt"
	"net/http"
	"testing"

	"gopkg.in/mgo.v2/bson"

	"github.com/jhh/puka/model"
	"github.com/jhh/puka/storage"
	"github.com/manyminds/api2go"
)

var oid = bson.NewObjectId()

var bookmarks = map[string]*model.Bookmark{
	oid.Hex(): &model.Bookmark{
		ID: oid,
	},
}

type MockStorage struct{}

func (s MockStorage) GetAll(_ storage.Query) (map[string]*model.Bookmark, error) {
	return bookmarks, nil
}

func (s MockStorage) GetOne(id string) (model.Bookmark, error) {
	return *bookmarks[id], nil
}

func (s MockStorage) Insert(b model.Bookmark) (bson.ObjectId, error) {
	return oid, nil
}

func (s MockStorage) Delete(id string) error {
	return nil
}

func (s MockStorage) Update(b model.Bookmark) error {
	return nil
}

func TestFindAll(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &MockStorage{}}
	response, _ := bmr.FindAll(api2go.Request{})
	if invalid, msg := checkBookmark(response); invalid {
		t.Error(msg)
	}
}

func TestFindOne(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &MockStorage{}}
	response, _ := bmr.FindOne(oid.Hex(), api2go.Request{})
	if invalid, msg := checkBookmark(response); invalid {
		t.Error(msg)
	}
}

func TestCreate(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &MockStorage{}}
	response, _ := bmr.Create(model.Bookmark{}, api2go.Request{})
	if invalid, msg := checkBookmark(response); invalid {
		t.Error(msg)
	}
}

func TestDelete(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &MockStorage{}}
	response, _ := bmr.Delete(oid.Hex(), api2go.Request{})
	if response.StatusCode() != http.StatusNoContent {
		t.Errorf("http status = %v; want: %v", response.StatusCode(), http.StatusNoContent)
	}
}

func TestUpdate(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &MockStorage{}}
	response, _ := bmr.Update(model.Bookmark{}, api2go.Request{})
	if invalid, msg := checkBookmark(response); invalid {
		t.Error(msg)
	}
}

type ErrorStorage struct{}

func (s ErrorStorage) GetAll(_ storage.Query) (map[string]*model.Bookmark, error) {
	return nil, errors.New("expected")
}

func (s ErrorStorage) GetOne(id string) (model.Bookmark, error) {
	return model.Bookmark{}, errors.New("expected")
}

func (s ErrorStorage) Insert(b model.Bookmark) (bson.ObjectId, error) {
	return "", errors.New("expected")
}

func (s ErrorStorage) Delete(id string) error {
	return errors.New("expected")
}

func (s ErrorStorage) Update(b model.Bookmark) error {
	return errors.New("expected")
}

func TestFindAllError(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &ErrorStorage{}}
	response, err := bmr.FindAll(api2go.Request{})
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
}

func TestFindOneError(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &ErrorStorage{}}
	response, err := bmr.FindOne("", api2go.Request{})
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
}

func TestCreateError(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &ErrorStorage{}}
	response, err := bmr.Create("", api2go.Request{})
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
	response, err = bmr.Create(model.Bookmark{}, api2go.Request{})
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
}

func TestDeleteError(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &ErrorStorage{}}
	response, err := bmr.Delete(oid.Hex(), api2go.Request{})
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
}

func TestUpdateError(t *testing.T) {
	bmr := BookmarkResource{BookmarkStorage: &ErrorStorage{}}
	response, err := bmr.Update("", api2go.Request{})
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
	response, err = bmr.Update(model.Bookmark{}, api2go.Request{})
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
}

func checkBookmark(r api2go.Responder) (bool, string) {
	result := r.Result()
	if bma, ok := result.([]model.Bookmark); ok {
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
