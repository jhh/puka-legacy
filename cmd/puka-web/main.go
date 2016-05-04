package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/jhh/puka/model"
	"github.com/jhh/puka/resource"
	"github.com/jhh/puka/storage"
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
	bookmarkStorage, err := storage.NewBookmarkMgoStorage()
	if err != nil {
		log.Fatal(err)
	}
	api := api2go.NewAPIWithBaseURL("v0", baseURL)
	defer bookmarkStorage.Close()
	api.AddResource(model.Bookmark{}, resource.BookmarkResource{BookmarkStorage: bookmarkStorage})

	log.Printf("Listening on :%s", port)
	http.ListenAndServe(fmt.Sprintf(":"+port), api.Handler())
}
