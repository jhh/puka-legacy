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

var (
	port      = os.Getenv("PORT")
	baseURL   = os.Getenv("BASE_URL")
	mongoURL  = os.Getenv("MONGODB_URI")
	authToken = os.Getenv("PUKA_TOKEN")
)

func init() {
	if port == "" {
		port = "8088"
		log.Println("$PORT not set, using: 8088")
	}
	if baseURL == "" {
		baseURL = "http://localhost:" + port
		log.Printf("$BASE_URL not set, using: %s", baseURL)
	}
	if mongoURL == "" {
		mongoURL = "mongodb://localhost/test"
		log.Printf("$MONGODB_URI not set, using: %s", mongoURL)
	}
	if authToken == "" {
		log.Println("$PUKA_TOKEN not set, will not authenticate")
	}
}

func main() {
	bookmarkStorage, err := storage.NewBookmarkMgoStorage(mongoURL)
	if err != nil {
		log.Fatal(err)
	}
	api := api2go.NewAPIWithBaseURL("v0", baseURL)
	if authToken != "" {
		api.UseMiddleware(middleware.NewAuthenticator(authToken))
	}
	defer bookmarkStorage.Close()
	api.AddResource(lib.Bookmark{}, resource.BookmarkResource{BookmarkStorage: bookmarkStorage})

	log.Printf("Listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, api.Handler()))
}
