package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"gopkg.in/mgo.v2"
)

func main() {
	session, err := mgo.Dial(os.Getenv("MONGODB_URI"))
	if err != nil {
		log.Fatalln(err)
	}
	defer session.Close()

	p := os.Getenv("PORT")
	if p == "" {
		log.Fatal("$PORT must be set")
	}

	http.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "pong")
	})

	log.Fatal(http.ListenAndServe(":"+p, nil))
}
