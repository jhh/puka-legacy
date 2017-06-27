package bookmark // import "github.com/jhh/puka/api/bookmark"

import (
	"errors"
	"strconv"

	"github.com/manyminds/api2go"
)

// Paginator handles page skip and limit calculations.
type Paginator struct {
	Skip, Limit int
}

// NewPaginator returns initialized Paginator.
// number and size: number starts at 1, size is page size.
// offset and limit: offset starts at 0, limit is page size.
func NewPaginator(r api2go.Request) (*Paginator, error) {
	var (
		numberStr, sizeStr, offsetStr, limitStr string
		skip, limit                             int
	)

	if numberQuery, ok := r.QueryParams["page[number]"]; ok {
		numberStr = numberQuery[0]
	}
	if sizeQuery, ok := r.QueryParams["page[size]"]; ok {
		sizeStr = sizeQuery[0]
	}
	if offsetQuery, ok := r.QueryParams["page[offset]"]; ok {
		offsetStr = offsetQuery[0]
	}
	if limitQuery, ok := r.QueryParams["page[limit]"]; ok {
		limitStr = limitQuery[0]
	}

	if sizeStr != "" {
		var err error
		limit, err = strconv.Atoi(sizeStr)
		if err != nil {
			return &Paginator{}, err
		}
		if limit < 0 {
			return &Paginator{}, errors.New("page[size] must be >= 0")
		}
		var num int
		num, err = strconv.Atoi(numberStr)
		if err != nil {
			return &Paginator{}, err
		}
		if num < 1 {
			return &Paginator{}, errors.New("page[number] must be > 0")
		}
		skip = limit * (num - 1)

	} else {
		var err error
		skip, err = strconv.Atoi(offsetStr)
		if err != nil {
			return &Paginator{}, err
		}
		if skip < 0 {
			return &Paginator{}, errors.New("page[offset] must be >= 0")
		}
		limit, err = strconv.Atoi(limitStr)
		if err != nil {
			return &Paginator{}, err
		}
		if limit < 0 {
			return &Paginator{}, errors.New("page[limit] must be >= 0")
		}
	}

	return &Paginator{Skip: skip, Limit: limit}, nil
}
