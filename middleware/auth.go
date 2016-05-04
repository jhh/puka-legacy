package middleware

import (
	"errors"
	"net/http"

	"github.com/manyminds/api2go"
)

// Authenticate puts error in context if not authenticated.
func Authenticate(c api2go.APIContexter, w http.ResponseWriter, r *http.Request) {
	p := r.FormValue("foo")
	if p != "bar" {
		return
	}
	err := api2go.NewHTTPError(errors.New("auth check failed"), "not authorized", http.StatusForbidden)
	c.Set("error", err)
}
