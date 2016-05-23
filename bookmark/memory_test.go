package bookmark // import "jhhgo.us/pukaws/bookmark"

import "testing"

func TestMemoryInterface(t *testing.T) {
	var bm interface{} = MemoryStorage{}
	if inty, ok := bm.(Storage); !ok {
		t.Errorf("%v does not implement Storage", inty)
	}
}

func TestCount(t *testing.T) {
	bms := NewMemoryStorage()
	if n, _ := bms.Count(Query{}); n != 11 {
		t.Errorf("bookmark count = %d; want: 11", n)
	}
}
