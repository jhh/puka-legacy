package middleware

import (
	"net/http"

	"github.com/manyminds/api2go"
)

// NewCORS sets the neccessary headers.
func NewCORS(origin string) api2go.HandlerFunc {
	return func(c api2go.APIContexter, w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		// TODO: Check Access-Control-Request-Headers, Access-Control-Request-Method
		w.Header().Set("Access-Control-Allow-Headers", "accept, content-type, x-puka-token")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
	}
}
