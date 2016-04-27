package main

import (
	"log"
	"net/http"
	"os"

	"gopkg.in/mgo.v2"

	"github.com/gin-gonic/gin"
)

func main() {
	session, err := mgo.Dial(os.Getenv("MONGODB_URI"))
	if err != nil {
		log.Fatalln("FATAL", err)
	}
	defer session.Close()

	p := os.Getenv("PORT")
	if p == "" {
		log.Fatal("$PORT must be set")
	}

	r := gin.Default()

	// PING test
	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "PONG")
	})

	r.Run(":" + p)
}
