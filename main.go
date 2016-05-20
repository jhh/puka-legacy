package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/jhh/puka-api/lib"
	"github.com/jhh/puka-api/lib/middleware"
	"github.com/jhh/puka-api/lib/resource"
	"github.com/jhh/puka-api/lib/storage"
	"github.com/manyminds/api2go"
)

var (
	port      = os.Getenv("PORT")
	baseURL   = os.Getenv("BASE_URL")
	mongoURL  = os.Getenv("MONGODB_URI")
	authToken = os.Getenv("PUKA_TOKEN")
	origin    = os.Getenv("ALLOW_ORIGIN")
)

func init() {
	if port == "" {
		port = "8088"
		fmt.Println("$PORT not set, using: 8088")
	}
	if baseURL == "" {
		baseURL = "http://localhost:" + port
		fmt.Printf("$BASE_URL not set, using: %s\n", baseURL)
	}
	if mongoURL == "" {
		mongoURL = "mongodb://localhost/test"
		fmt.Printf("$MONGODB_URI not set, using: %s\n", mongoURL)
	}
	if authToken == "" {
		fmt.Println("$PUKA_TOKEN not set, will not authenticate")
	}
	if origin == "" {
		origin = "http://localhost:8080"
		fmt.Printf("$ALLOW_ORIGIN not set, using %s\n", origin)
	}
}

func main() {
	bookmarkStorage, err := storage.NewBookmarkMgoStorage(mongoURL)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	defer bookmarkStorage.Close()
	api := newAPI(bookmarkStorage, baseURL)
	api.UseMiddleware(middleware.CORS)
	if authToken != "" {
		api.UseMiddleware(middleware.NewAuthenticator(authToken))
	}
	fmt.Printf("Listening on :%s\n", port)
	fmt.Println(http.ListenAndServe(":"+port, api.Handler()))
}

func newAPI(st storage.BookmarkStorage, base string) *api2go.API {
	api := api2go.NewAPIWithBaseURL("v0", base)
	api.AddResource(lib.Bookmark{}, resource.BookmarkResource{BookmarkStorage: st})
	return api
}
