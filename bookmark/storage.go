package bookmark // import "jhhgo.us/pukaws/bookmark"

// Storage abstracts database interactions.
type Storage interface {
	// GetAll returns bookmarks specified by query in decending date order.
	GetAll(q Query) ([]Bookmark, error)

	// GetPage returns a portion of bookmarks specified by query.
	GetPage(q Query, skip, limit int) ([]Bookmark, error)

	// Count returns the total number of bookmarks specified by query.
	Count(q Query) (int, error)

	// GetOne returns the bookmark with the specified id
	GetOne(id string) (Bookmark, error)

	// Insert adds a bookmark to the database
	Insert(b *Bookmark) error

	// Delete removes a bookmark from the database
	Delete(id string) error

	// Update modifies an existing bookmark
	Update(b *Bookmark) error
}
