package storage // import "jhhgo.us/pukaws/storage"

import (
	"github.com/manyminds/api2go"
	"gopkg.in/mgo.v2/bson"
)

// A Query is used for filtering storage results.
type Query struct {
	tag string
}

// NewQuery parses the request query parameters into a filtering query.
func NewQuery(r api2go.Request) Query {
	if tagQuery, ok := r.QueryParams["filter[tag]"]; ok {
		return Query{tag: tagQuery[0]}
	}
	return Query{}
}

// Mgo provides the query for the Mgo driver
func (q Query) Mgo() bson.M {
	if q.tag == "" {
		return nil
	}
	return bson.M{"tags": q.tag}
}
