package bookmark // import "github.com/jhh/puka/api/bookmark"

import (
	"testing"

	"github.com/manyminds/api2go"
)

func TestNewQuery(t *testing.T) {
	req := api2go.Request{
		QueryParams: map[string][]string{
			"filter[tag]": []string{"foo"},
		},
	}
	m := NewQuery(req).Mgo()
	if m["tags"] != "foo" {
		t.Errorf("tag = %q; want: %q", m["tag"], "foo")
	}
}
