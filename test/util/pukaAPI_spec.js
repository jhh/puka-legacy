import { isPlainObject, size, keys, values } from 'lodash';
import { expect } from 'chai';
import pukaAPI from '../../src/util/pukaAPI';

describe('pukaAPI', () => {
  describe('getBookmarks', () => {
    const result = pukaAPI('http://localhost:9292/api/bookmarks?page[limit]=100');

    it('returns a Promise', () => {
      expect(result).to.be.an.instanceof(Promise);
    });

    it('is a plain object', () => {
      result.then(resp => {
        expect(isPlainObject(resp)).to.be(true);
        expect(isPlainObject(resp.entities)).to.be(true);
        expect(isPlainObject(resp.entities.bookmarks)).to.be(true);
      });
    });

    it('has 100 bookmarks', () =>
      result.then(resp => expect(size(resp.entities.bookmarks)).to.equal(100))
    );

    it('is keyed by MongoDB id', () =>
      result.then(resp => {
        const id = keys(resp.entities.bookmarks)[0];
        expect(id).to.have.length(24);
      })
    );

    it('returns bookmark properties', () =>
      result.then(resp => {
        const val = values(resp.entities.bookmarks)[99];
        expect(val).to.have.all.keys(['id', 'title', 'bookmark', 'date', 'description', 'tags']);
      })
    );
  });
});
