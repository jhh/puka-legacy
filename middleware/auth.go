package middleware

import (
	"errors"
	"net/http"
	"time"

	"github.com/manyminds/api2go"
)

// Authenticate puts error in context if not authenticated.
func Authenticate(c api2go.APIContexter, w http.ResponseWriter, r *http.Request) {
	p := r.FormValue("foo")
	if p != "bar" {
		expiration := time.Now().Add(5 * time.Minute)
		cookie := http.Cookie{
			Name:     "username",
			Value:    "jhh",
			Expires:  expiration,
			HttpOnly: true,
		}
		http.SetCookie(w, &cookie)
		return
	}
	err := api2go.NewHTTPError(errors.New("auth check failed"), "not authorized", http.StatusForbidden)
	c.Set("error", err)
}
