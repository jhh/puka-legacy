package middleware

import (
	"net/http"

	"github.com/manyminds/api2go"
)

// Authenticate puts error in context if not authenticated.
func Authenticate(c api2go.APIContexter, w http.ResponseWriter, r *http.Request) {
}
