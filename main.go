package main

import (
	"log"
	"net/http"
	"os"

	"github.com/jhh/puka-api/lib"
	"github.com/jhh/puka-api/lib/middleware"
	"github.com/jhh/puka-api/lib/resource"
	"github.com/jhh/puka-api/lib/storage"
	"github.com/manyminds/api2go"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("$PORT must be set")
	}
	baseURL := os.Getenv("BASE_URL")
	if baseURL == "" {
		log.Fatal("$BASE_URL must be set")
	}
	mongoURL := os.Getenv("MONGODB_URI")
	if mongoURL == "" {
		log.Fatal("$MONGODB_URI must be set")
	}
	bookmarkStorage, err := storage.NewBookmarkMgoStorage(mongoURL)
	if err != nil {
		log.Fatal(err)
	}
	api := api2go.NewAPIWithBaseURL("v0", baseURL)
	api.UseMiddleware(middleware.Authenticate)
	defer bookmarkStorage.Close()
	api.AddResource(lib.Bookmark{}, resource.BookmarkResource{BookmarkStorage: bookmarkStorage})

	log.Printf("Listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, api.Handler()))
}
