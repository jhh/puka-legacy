package middleware

import (
	"net/http"
	"testing"

	"github.com/manyminds/api2go"
)

func TestAuthPass(t *testing.T) {
	tok := "test_context_token"
	handler := NewAuthenticator(tok)
	context := &api2go.APIContext{}
	req := &http.Request{Header: http.Header{PukaTokenHeader: []string{tok}}}
	handler(context, nil, req)
	ret, ok := context.Get("error")
	if ok {
		t.Errorf("context.Get(\"error\") returned %v; want: nil", ret)
	}
}

func TestAuthFail(t *testing.T) {
	tok := "test_token"
	handler := NewAuthenticator(tok)
	context := &api2go.APIContext{}
	req := &http.Request{Header: http.Header{PukaTokenHeader: []string{"fail"}}}
	handler(context, nil, req)
	rc, ok := context.Get("error")
	if !ok {
		t.Error("context.Get(\"error\") returned not ok")
	}
	re, ok := rc.(api2go.HTTPError)
	if !ok {
		t.Error("ret.(api2go.HTTPError) type assertion returned not ok")
	}
	want := "http error (401) not authenticated and 0 more errors"
	if re.Error() != want {
		t.Errorf("error = %q; want: %q", re.Error(), want)
	}
}

func TestNoToken(t *testing.T) {
	tok := "test_token"
	handler := NewAuthenticator(tok)
	context := &api2go.APIContext{}
	req := &http.Request{Header: http.Header{}}
	handler(context, nil, req)
	rc, ok := context.Get("error")
	if !ok {
		t.Error("context.Get(\"error\") returned not ok")
	}
	re, ok := rc.(api2go.HTTPError)
	if !ok {
		t.Error("ret.(api2go.HTTPError) type assertion returned not ok")
	}
	want := "http error (401) not authenticated and 0 more errors"
	if re.Error() != want {
		t.Errorf("error = %q; want: %q", re.Error(), want)
	}
}
