package middleware // import "github.com/jhh/puka/api/middleware"

import (
	"net/http"

	"github.com/manyminds/api2go"
)

// CORS sets the neccessary headers.
func CORS(c api2go.APIContexter, w http.ResponseWriter, r *http.Request) {
	// Valid CORS requests have an Origin header
	origin, err := getOrigin(r.Header)
	if err != nil {
		c.Set("error", err)
		return
	}

	// Valid pre-flight is OPTIONS, otherwise actual request
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "accept, content-type, x-puka-token")
		w.Header().Set("Access-Control-Max-Age", "600")
	}

	w.Header().Set("Access-Control-Allow-Origin", origin)
}

func getOrigin(h http.Header) (string, error) {
	var orig string
	if oh, ok := h["Origin"]; ok {
		orig = oh[0]
		if orig == "" {
			return "", api2go.NewHTTPError(nil, "Origin header is empty", http.StatusBadRequest)
		}
	} else {
		return "", api2go.NewHTTPError(nil, "CORS request requires Origin header", http.StatusBadRequest)
	}
	return orig, nil
}
