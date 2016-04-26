package main

import (
	"log"
	"os"

	"github.com/codegangsta/cli"

	"gopkg.in/mgo.v2"
)

func main() {
	app := cli.NewApp()
	app.Name = "puka"
	app.Usage = "manage puka data"

	app.Flags = []cli.Flag{
		cli.StringFlag{
			Name:  "database, db",
			Value: "test",
			Usage: "database to operate on",
		},
		cli.StringFlag{
			Name:  "collection, c",
			Value: "bookmarks",
			Usage: "collection to update",
		},
	}

	app.Action = UpdateBookmarks
	app.Run(os.Args)
}

// UpdateBookmarks updates the field names.
func UpdateBookmarks(c *cli.Context) {
	session, err := mgo.Dial("localhost")
	if err != nil {
		log.Fatalln(err)
	}
	defer session.Close()

	col := session.DB(c.String("database")).C(c.String("collection"))

	result := LegacyBookmark{}
	iter := col.Find(nil).Iter()
	for iter.Next(&result) {
		err = col.UpdateId(result.ID, result.NewBookmark())
		if err != nil {
			log.Fatalln(err)
		}
	}
	if err = iter.Close(); err != nil {
		log.Fatalln(err)
	}
}
