package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/jhh/puka/model"
	"github.com/jhh/puka/resource"
	"github.com/jhh/puka/storage"
	"github.com/manyminds/api2go"
)

func main() {
	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		log.Fatal("$PORT must be set")
	}
	baseURL := os.Getenv("BASE_URL")
	if baseURL == "" {
		log.Fatal("$BASE_URL must be set")
	}
	api := api2go.NewAPIWithBaseURL("v0", baseURL)
	bookmarkStorage, err := storage.NewBookmarkMgoStorage()
	if err != nil {
		log.Fatal(err)
	}
	defer bookmarkStorage.Close()
	api.AddResource(model.Bookmark{}, resource.BookmarkResource{BookmarkStorage: bookmarkStorage})

	fmt.Printf("Listening on :%d", port)
	http.ListenAndServe(fmt.Sprintf(":%d", port), api.Handler())
}
