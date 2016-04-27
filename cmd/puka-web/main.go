package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
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
