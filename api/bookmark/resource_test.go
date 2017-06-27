package bookmark // import "github.com/jhh/puka/api/bookmark"

import (
	"errors"
	"fmt"
	"net/http"
	"testing"

	"gopkg.in/mgo.v2/bson"

	"github.com/manyminds/api2go"
)

var roid = bson.NewObjectId()

var bookmarks = []Bookmark{
	Bookmark{
		ID: roid,
	},
}

// Resource uses Request.Context for authentication error checks.
var request = api2go.Request{
	Context: &api2go.APIContext{},
}

type MockStorage struct{}

func (s MockStorage) GetAll(_ Query) ([]Bookmark, error) {
	return bookmarks, nil
}

func (s MockStorage) GetPage(_ Query, skip, limit int) ([]Bookmark, error) {
	return []Bookmark{}, errors.New("not implemented")
}

func (s MockStorage) Count(_ Query) (int, error) {
	return len(bookmarks), nil
}

func (s MockStorage) GetOne(id string) (Bookmark, error) {
	return bookmarks[0], nil
}

func (s MockStorage) Insert(b *Bookmark) error {
	b.ID = roid
	return nil
}

func (s MockStorage) Delete(id string) error {
	return nil
}

func (s MockStorage) Update(b *Bookmark) error {
	return nil
}

func TestFindAll(t *testing.T) {
	bmr := Resource{Storage: &MockStorage{}}
	response, _ := bmr.FindAll(request)
	if invalid, msg := checkBookmark(response); invalid {
		t.Error(msg)
	}
}

func TestFindOne(t *testing.T) {
	bmr := Resource{Storage: &MockStorage{}}
	response, _ := bmr.FindOne(roid.Hex(), request)
	if invalid, msg := checkBookmark(response); invalid {
		t.Error(msg)
	}
}

func TestCreate(t *testing.T) {
	bmr := Resource{Storage: &MockStorage{}}
	response, _ := bmr.Create(Bookmark{}, request)
	if invalid, msg := checkBookmark(response); invalid {
		t.Error(msg)
	}
}

func TestDeleteBookmark(t *testing.T) {
	bmr := Resource{Storage: &MockStorage{}}
	response, _ := bmr.Delete(roid.Hex(), request)
	if response.StatusCode() != http.StatusNoContent {
		t.Errorf("http status = %v; want: %v", response.StatusCode(), http.StatusNoContent)
	}
}

func TestUpdateBookmark(t *testing.T) {
	bmr := Resource{Storage: &MockStorage{}}
	response, _ := bmr.Update(Bookmark{}, request)
	if invalid, msg := checkBookmark(response); invalid {
		t.Error(msg)
	}
}

type ErrorStorage struct{}

func (s ErrorStorage) GetAll(_ Query) ([]Bookmark, error) {
	return nil, errors.New("expected")
}

func (s ErrorStorage) GetPage(_ Query, skip, limit int) ([]Bookmark, error) {
	return []Bookmark{}, errors.New("not implemented")
}

func (s ErrorStorage) Count(_ Query) (int, error) {
	return 0, errors.New("expected")
}

func (s ErrorStorage) GetOne(id string) (Bookmark, error) {
	return Bookmark{}, errors.New("expected")
}

func (s ErrorStorage) Insert(b *Bookmark) error {
	return errors.New("expected")
}

func (s ErrorStorage) Delete(id string) error {
	return errors.New("expected")
}

func (s ErrorStorage) Update(b *Bookmark) error {
	return errors.New("expected")
}

func TestFindAllError(t *testing.T) {
	bmr := Resource{Storage: &ErrorStorage{}}
	response, err := bmr.FindAll(request)
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
}

func TestFindOneError(t *testing.T) {
	bmr := Resource{Storage: &ErrorStorage{}}
	response, err := bmr.FindOne("", request)
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
}

func TestCreateError(t *testing.T) {
	bmr := Resource{Storage: &ErrorStorage{}}
	response, err := bmr.Create("", request)
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
	response, err = bmr.Create(Bookmark{}, request)
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
}

func TestDeleteError(t *testing.T) {
	bmr := Resource{Storage: &ErrorStorage{}}
	response, err := bmr.Delete(roid.Hex(), request)
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
}

func TestUpdateError(t *testing.T) {
	bmr := Resource{Storage: &ErrorStorage{}}
	response, err := bmr.Update("", request)
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
	response, err = bmr.Update(Bookmark{}, request)
	if invalid, msg := checkError(response, err); invalid {
		t.Error(msg)
	}
}

func checkBookmark(r api2go.Responder) (bool, string) {
	result := r.Result()
	if bma, ok := result.([]Bookmark); ok {
		bm := bma[0]
		if bm.ID != roid {
			return true, fmt.Sprintf("id = %v; wanted: %v", bm.ID, roid)
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
