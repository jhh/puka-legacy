package main

import (
	"fmt"
	"log"
	"os"

	"github.com/codegangsta/cli"
	"github.com/jhh/puka/model"

	"gopkg.in/mgo.v2"

	"github.com/manyminds/api2go/jsonapi"
)

func main() {
	app := cli.NewApp()
	app.Name = "puka"
	app.Usage = "manage puka data"
	app.Version = "0.0.2"

	app.Flags = []cli.Flag{
		cli.StringFlag{
			Name:  "url",
			Value: "mongodb://localhost/test",
			Usage: "mongo url connection string",
		},
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

	app.Commands = []cli.Command{
		{
			Name:   "update",
			Usage:  "update the document schema",
			Action: UpdateBookmarks,
		},
		{
			Name:   "bookmark",
			Usage:  "print one bookmark",
			Action: PrintOne,
		},
	}
	app.Action = func(c *cli.Context) {
		log.Println("DEBUG", c.String("url"), c.String("database"), c.String("collection"))
	}
	app.Run(os.Args)
}

// UpdateBookmarks updates the field names.
func UpdateBookmarks(c *cli.Context) {
	session, err := mgo.Dial(c.GlobalString("url"))
	if err != nil {
		log.Fatalln("FATAL", err)
	}
	defer session.Close()

	col := session.DB(c.GlobalString("database")).C(c.GlobalString("collection"))

	result := LegacyBookmark{}
	iter := col.Find(nil).Iter()
	for iter.Next(&result) {
		err = col.UpdateId(result.ID, result.NewBookmark())
		if err != nil {
			log.Fatalln(err)
		}
	}
	if err = iter.Close(); err != nil {
		log.Fatalln("FATAL", err)
	}
}

// PrintOne will retrieve a bookmark and print to std out.
func PrintOne(c *cli.Context) {
	session, err := mgo.Dial(c.GlobalString("url"))
	if err != nil {
		log.Println(c.GlobalString("url"))
		log.Fatalln("FATAL", err)
	}
	defer session.Close()

	col := session.DB(c.GlobalString("database")).C(c.GlobalString("collection"))

	result := model.Bookmark{}
	err = col.Find(nil).One(&result)
	if err != nil {
		log.Println("DEBUG", c.GlobalString("url"), c.GlobalString("database"), c.GlobalString("collection"))
		log.Fatalln("FATAL", err)
	}
	json, err := jsonapi.Marshal(result)
	if err != nil {
		log.Fatalln("FATAL", err)
	}
	fmt.Println(string(json))
}
