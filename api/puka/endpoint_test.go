package main

import "testing"

func TestNoParms(t *testing.T) {
	e := Endpoint{}
	if e.URL() != endpoint {
		t.Errorf("URL = %q; want: %q", e.URL(), endpoint)
	}
}

func TestTag(t *testing.T) {
	e := Endpoint{Tag: "foo"}
	want := endpoint + "?filter[tag]=foo"
	if e.URL() != want {
		t.Errorf("URL = %q; want: %q", e.URL(), want)
	}
}
