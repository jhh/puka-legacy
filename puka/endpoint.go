// Package puka provides option handling.
package main

// Endpoint represents the API endpoint URL.
type Endpoint struct {
	Tag    string
	Offset int
	Limit  int
}

const endpoint string = "http://localhost:8088/v0/bookmarks"

// URL returns the endpoint URL.
func (e Endpoint) URL() string {
	var q []string
	if e.Tag != "" {
		q = append(q, "filter[tag]="+e.Tag)
	}
	if len(q) > 0 {
		ret := endpoint + "?"
		for _, p := range q {
			ret = ret + p
		}
		return ret
	}
	return endpoint
}
