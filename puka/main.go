package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"jhhgo.us/pukaws/bookmark"

	"github.com/manyminds/api2go/jsonapi"
)

var tag = flag.String("tag", "", "shows bookmarks for tag.")

func main() {
	flag.Parse()
	ep := Endpoint{Tag: *tag}
	resp, err := http.Get(ep.URL())
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if e := resp.Body.Close(); e != nil {
			log.Fatal(e)
		}
	}()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	var bookmarks []bookmark.Bookmark
	err = jsonapi.Unmarshal(body, &bookmarks)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("bookmarks = %+v\n", bookmarks)
}
