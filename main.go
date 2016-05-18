package main

import (
	"log"
	"net/http"
	"os"

	"github.com/jhh/puka-api/lib"
	"github.com/jhh/puka-api/lib/resource"
	"github.com/jhh/puka-api/lib/storage"
	"github.com/manyminds/api2go"
)

func main() {
	port := getenv("PORT")
	baseURL := getenv("BASE_URL")
	mongoURL := getenv("MONGODB_URI")
	bookmarkStorage, err := storage.NewBookmarkMgoStorage(mongoURL)
	if err != nil {
		log.Fatal(err)
	}
	api := api2go.NewAPIWithBaseURL("v0", baseURL)
	// api.UseMiddleware(middleware.Authenticate)
	defer bookmarkStorage.Close()
	api.AddResource(lib.Bookmark{}, resource.BookmarkResource{BookmarkStorage: bookmarkStorage})

	log.Printf("Listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, api.Handler()))
}

func getenv(v string) string {
	r := os.Getenv(v)
	if r == "" {
		log.Fatalf("$%s must be set", v)
	}
	return r
}
