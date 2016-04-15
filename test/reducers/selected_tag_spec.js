import { expect } from 'chai';
import * as actions from '../../src/app/actions';
import reducer, { selectedTag } from '../../src/app/reducers';

describe('reducer', () => {
  describe('selectedTag', () => {
    it('should reduce to the selected tag with uninitialized state', () => {
      const tag = 'foobar';
      const state = undefined;
      const newState = selectedTag(state, actions.selectTag(tag));
      expect(newState).to.equal(tag);
    });

    it('should reduce to the selected tag with initialized state', () => {
      const tag = 'foobar';
      const state = 'baz';
      const newState = selectedTag(state, actions.selectTag(tag));
      expect(newState).to.equal(tag);
    });

    it('should return the original state for unrecognized actions', () => {
      const tag = 'foobar';
      const state = 'buz';
      const newState = selectedTag(state, actions.invalidateTag(tag));
      expect(newState).to.equal(state);
    });
  });
});
