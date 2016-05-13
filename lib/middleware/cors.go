package middleware

import (
	"net/http"

	"github.com/manyminds/api2go"
)

// CORS sets the neccessary headers.
func CORS(c api2go.APIContexter, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	// TODO: Check Access-Control-Request-Headers, Access-Control-Request-Method
	w.Header().Set("Access-Control-Allow-Headers", "accept, content-type")
}
