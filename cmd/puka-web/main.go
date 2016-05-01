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
	api := api2go.NewAPI("v0")
	bookmarkStorage, err := storage.NewBookmarkMgoStorage()
	if err != nil {
		log.Fatal(err)
	}
	defer bookmarkStorage.Close()
	api.AddResource(model.Bookmark{}, resource.BookmarkResource{BookmarkStorage: bookmarkStorage})

	fmt.Printf("Listening on :%d", port)
	http.ListenAndServe(fmt.Sprintf(":%d", port), api.Handler())
}
