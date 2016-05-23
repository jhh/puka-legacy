package storage // import "jhhgo.us/pukaws/storage"

import "testing"

func TestMemoryInterface(t *testing.T) {
	var bm interface{} = BookmarkMemoryStorage{}
	if inty, ok := bm.(BookmarkStorage); !ok {
		t.Errorf("%v does not implement BookmarkStorage", inty)
	}
}

func TestCount(t *testing.T) {
	bms := NewBookmarkMemoryStorage()
	if n, _ := bms.Count(Query{}); n != 11 {
		t.Errorf("bookmark count = %d; want: 11", n)
	}
}
