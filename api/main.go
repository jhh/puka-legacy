package main // import "github.com/jhh/puka/api"

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/jhh/puka/api/bookmark"
	"github.com/jhh/puka/api/middleware"
	"github.com/manyminds/api2go"
)

var (
	port      = os.Getenv("PORT")
	baseURL   = os.Getenv("BASE_URL")
	mongoURL  = os.Getenv("MONGODB_URI")
	authToken = os.Getenv("PUKA_TOKEN")
)

func init() {
	log.SetFlags(0)
	log.SetPrefix("puka: ")
	if port == "" {
		port = "8088"
		log.Println("$PORT not set, using: 8088")
	}
	if baseURL == "" {
		baseURL = "http://localhost:" + port
		log.Printf("$BASE_URL not set, using: %s\n", baseURL)
	}
	if mongoURL == "" {
		mongoURL = "mongodb://localhost/test"
		log.Printf("$MONGODB_URI not set, using: %s\n", mongoURL)
	}
	if authToken == "" {
		log.Println("$PUKA_TOKEN not set, will not authenticate")
	}
}

func main() {
	log.Printf("connecting to mongo at %s\n", mongoURL)
	bookmarkStorage, err := bookmark.NewMgoStorage(mongoURL)
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
	log.Printf("listening on %s\n", baseURL)
	log.Fatal(http.ListenAndServe(":"+port, api.Handler()))
}

func newAPI(st bookmark.Storage, base string) *api2go.API {
	api := api2go.NewAPIWithBaseURL("v0", base)
	api.AddResource(bookmark.Bookmark{}, bookmark.Resource{Storage: st})
	return api
}
