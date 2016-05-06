package middleware

import (
	"net/http"

	"github.com/manyminds/api2go"
)

// Authenticate puts error in context if not authenticated.
func Authenticate(c api2go.APIContexter, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	// TODO: Check Access-Control-Request-Headers, Access-Control-Request-Method
	w.Header().Set("Access-Control-Allow-Headers", "accept, content-type")
	// p := r.FormValue("foo")
	// if p != "bar" {
	// 	expiration := time.Now().Add(5 * time.Minute)
	// 	cookie := http.Cookie{
	// 		Name:     "username",
	// 		Value:    "jhh",
	// 		Expires:  expiration,
	// 		HttpOnly: true,
	// 	}
	// 	http.SetCookie(w, &cookie)
	// 	return
	// }
	// err := api2go.NewHTTPError(errors.New("auth check failed"), "not authorized", http.StatusForbidden)
	// c.Set("error", err)
}
