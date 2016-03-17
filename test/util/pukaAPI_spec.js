import { expect } from 'chai';
import pukaAPI from '../../src/util/pukaAPI';

describe('pukaAPI', () => {
  describe('getBookmarks', () => {
    const result = pukaAPI.getBookmarks();

    it('returns a Promise', () => {
      expect(result).to.be.an.instanceof(Promise);
    });

    it('resolves to a Map', () =>
      result.then(resp => expect(resp).to.be.an.instanceof(Map))
    );

    it('has 100 bookmarks', () =>
      result.then(resp => expect(resp.size).to.equal(100))
    );

    it('is keyed by MongoDB id', () =>
      result.then(resp => {
        const id = resp.keys().next().value;
        expect(id).to.have.length(24);
      })
    );

    it('returns bookmark properties', () =>
      result.then(resp => {
        const val = resp.values().next().value;
        expect(val).to.have.all.keys(['title', 'bookmark', 'date', 'description', 'tags']);
      })
    );
  });
});
