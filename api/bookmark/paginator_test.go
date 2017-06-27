package bookmark // import "jhhgo.us/pukaws/bookmark"

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
	{"", "", "", "", 0, 0, true},
	{"1", "0", "", "", 0, 0, false},
	{"1", "2", "", "", 0, 2, false},
	{"2", "2", "", "", 2, 2, false},
	{"3", "5", "", "", 10, 5, false},
	{"", "", "0", "2", 0, 2, false},
	{"", "", "2", "3", 2, 3, false},
	{"", "", "0", "0", 0, 0, false},
	{"0", "1", "", "", 0, 0, true},
	{"1", "-1", "", "", 0, 0, true},
	{"-1", "1", "", "", 0, 0, true},
	{"-1", "-1", "", "", 0, 0, true},
	{"", "", "-1", "0", 0, 0, true},
	{"", "", "0", "-1", 0, 0, true},
	{"", "", "-1", "-1", 0, 0, true},
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
		if (err != nil) != pt.isErr {
			t.Logf("number = %q, size = %q, offset = %q, limit = %q, err = %q",
				pt.num, pt.siz, pt.off, pt.lim, err)
			t.Errorf("returned err = %t; want: %t", err != nil, pt.isErr)
		}
		if p.Skip != pt.skip {
			t.Logf("number = %q, size = %q, offset = %q, limit = %q",
				pt.num, pt.siz, pt.off, pt.lim)
			t.Errorf("skip = %d; want: %d", p.Skip, pt.skip)
		}
		if p.Limit != pt.limit {
			t.Logf("number = %q, size = %q, offset = %q, limit = %q",
				pt.num, pt.siz, pt.off, pt.lim)
			t.Errorf("limit = %d; want: %d", p.Limit, pt.limit)
		}
	}
}
