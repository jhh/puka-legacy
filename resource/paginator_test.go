package resource

import (
	"testing"

	"github.com/manyminds/api2go"
)

var tests = []struct {
	num   string
	siz   string
	off   string
	lim   string
	skip  int
	limit int
	isErr bool
}{
	{"1", "2", "", "", 0, 2, false},
	{"0", "2", "", "", 0, 0, true},
}

func TestQueryParamsParser(t *testing.T) {
	for _, pt := range tests {
		qp := map[string][]string{
			"page[number]": []string{pt.num},
			"page[size]":   []string{pt.siz},
			"page[offset]": []string{pt.off},
			"page[limit]":  []string{pt.lim},
		}
		p, err := NewPaginator(api2go.Request{QueryParams: qp})
		if err != nil {
			t.Log(err)
			if !pt.isErr {
				t.Errorf("returned err = %t; want: %t", err != nil, pt.isErr)
			}
		}
		if p.Skip != pt.skip {
			t.Errorf("skip = %d; want: %d", p.Skip, pt.skip)
		}
		if p.Limit != pt.limit {
			t.Errorf("limit = %d; want: %d", p.Limit, pt.limit)
		}
	}
}
