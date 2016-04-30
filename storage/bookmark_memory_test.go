package storage

import "testing"

func Test(t *testing.T) {
	var bm interface{} = BookmarkMemoryStorage{}
	if inty, ok := bm.(BookmarkStorage); !ok {
		t.Errorf("%v does not implement BookmarkStorage", inty)
	}
}
