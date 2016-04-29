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
	"github.com/julienschmidt/httprouter"
	"github.com/manyminds/api2go"
	"github.com/manyminds/api2go/examples/resolver"
)

func main() {
	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		log.Fatal("$PORT must be set")
	}
	api := api2go.NewAPIWithResolver("v0", &resolver.RequestURL{Port: port})
	bookmarkStorage := storage.NewBookmarkMemoryStorage()
	api.AddResource(model.Bookmark{}, resource.BookmarkResource{BookmarkStorage: bookmarkStorage})

	fmt.Printf("Listening on :%d", port)
	handler := api.Handler().(*httprouter.Router)
	// It is also possible to get the instance of julienschmidt/httprouter and add more custom routes!
	handler.GET("/hello-world", func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		fmt.Fprint(w, "Hello World!\n")
	})

	http.ListenAndServe(fmt.Sprintf(":%d", port), handler)
}
