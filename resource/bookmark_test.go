package resource

import (
	"fmt"
	"testing"

	"github.com/jhh/puka/model"
)

type MockStorage struct {
	Data []interface{}
}

func (s MockStorage) GetAll() (map[string]*model.Bookmark, error) {
	return make(map[string]*model.Bookmark, 0), nil
}

func Test(t *testing.T) {
	t.Skip("unimplemented")
	bms := MockStorage{}
	bmr := BookmarkResource{BookmarkStorage: bms}
	fmt.Println(bmr)
}
