package middleware // import "github.com/jhh/puka/api/middleware"

import (
	"fmt"
	"net/http"
	"strings"
	"testing"

	"github.com/manyminds/api2go"
)

type TestResponseWriter struct{}

func (t *TestResponseWriter) Header() http.Header {
	return http.Header{}
}

func (t *TestResponseWriter) Write([]byte) (int, error) {
	panic("not implemented")
}

func (t *TestResponseWriter) WriteHeader(int) {
	panic("not implemented")
}

func TestOriginMissing(t *testing.T) {
	r := &http.Request{Header: http.Header{}}
	c := &api2go.APIContext{}
	CORS(c, &TestResponseWriter{}, r)
	m := assertError(c, "CORS request requires Origin header")
	if m != "" {
		t.Error(m)
	}
}

func TestOriginEmpty(t *testing.T) {
	r := &http.Request{Header: http.Header{"Origin": []string{""}}}
	c := &api2go.APIContext{}
	CORS(c, &TestResponseWriter{}, r)
	m := assertError(c, "Origin header is empty")
	if m != "" {
		t.Error(m)
	}
}

func TestOriginPresent(t *testing.T) {
	r := &http.Request{Header: http.Header{"Origin": []string{"foobar"}}}
	c := &api2go.APIContext{}
	CORS(c, &TestResponseWriter{}, r)
	err, ok := c.Get("error")
	if ok {
		t.Errorf("context.Get(\"error\") returned %v; want: nil", err)
	}
}

func assertError(c api2go.APIContexter, msg string) string {
	ctxerr, ok := c.Get("error")
	if !ok {
		return "context.Get(\"error\") returned nil; want: error"
	}
	err, ok := ctxerr.(api2go.HTTPError)
	if !ok {
		return fmt.Sprintf("context.Get(\"error\") returned %#v; want: HTTPError", ctxerr)
	}
	if !strings.Contains(err.Error(), msg) {
		return fmt.Sprintf("err msg = %q; want: %q", err.Error(), msg)
	}
	return ""
}
