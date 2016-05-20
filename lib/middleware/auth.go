package middleware

import (
	"net/http"

	"github.com/manyminds/api2go"
)

// PukaTokenHeader is the HTTP header used for auth.
const PukaTokenHeader = "X-Puka-Token"

// NewAuthenticator returns a api2go middleware handler function.
func NewAuthenticator(tok string) api2go.HandlerFunc {
	return func(c api2go.APIContexter, w http.ResponseWriter, r *http.Request) {
		t := r.FormValue("token")
		if t == tok {
			return
		}
		e := api2go.NewHTTPError(nil, "not authenticated", http.StatusUnauthorized)
		c.Set("error", e)
	}
}
