# Puka

[![Build Status](https://travis-ci.org/jhh/puka-api.svg?branch=master)](https://travis-ci.org/jhh/puka-api)

This is the Puka API implemented in [Go][golang]. It relies on the [api2go] package for implementation of the [JSONAPI.org][jsonapi] json API spec and REST service. It uses MongoDB as a database. An in-memory storage implementation is provided for testing.

## Installing

```
$ go get jhhgo.us/pukaws
```

## REST API

The Puka server provides the following API endpoints.

```
OPTIONS /v0/bookmarks
OPTIONS /v0/bookmarks/<id>
GET     /v0/bookmarks
POST    /v0/bookmarks
GET     /v0/bookmarks/<id>
PATCH   /v0/bookmarks/<id>
DELETE  /v0/bookmarks/<id>
```

The resource data conforms to the [JSONAPI.org][jsonapi] spec. An example is:

```
GET /v0/bookmarks
```

```json
{
  "data": [
    {
      "type": "bookmarks",
      "id": "57237644f300e62b80e076ea",
      "attributes": {
        "title": "Hydrogen",
        "url": "http://example.com/H",
        "description": "Colorless, odorless, tasteless, non-toxic, nonmetallic, highly combustible diatomic gas.",
        "timestamp": "0001-01-01T00:00:00Z",
        "tags": [
          "test",
          "element"
        ]
      }
    },
    {
      "type": "bookmarks",
      "id": "57237749f300e62b80e076eb",
      "attributes": {
        "title": "Helium",
        "url": "http://example.com/He",
        "description": "Colorless gas, exhibiting a red-orange glow when placed in a high-voltage electric field.",
        "timestamp": "0001-01-01T00:00:00Z",
        "tags": [
          "test",
          "element"
        ]
      }
    }
  ],
  "meta": {
    "license": "CC0 1.0",
    "license-url": "https://creativecommons.org/publicdomain/zero/1.0/"
  }
}
```

## Getting Started

The $PORT and $BASE_URL environment variables must be set.

```
$ go get github.org/jhh/puka-api
$ go install .
$ env PORT=8080 BASE_URL=http://localhost:8080 puka-api
```

[api2go]: https://github.com/manyminds/api2go
[golang]: https://golang.org/
[jsonapi]: http://jsonapi.org/
