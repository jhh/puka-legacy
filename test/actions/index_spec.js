import { expect } from 'chai';
import * as actions from '../../src/bookmark/bookmark-list-actions';
import * as c from '../../src/app/constants';

describe('actions', () => {
  it('should create an action to select a tag', () => {
    const tag = 'bar';
    const { type, payload } = actions.selectTag(tag);
    expect(type).to.equal(c.SELECT_TAG);
    expect(payload.tag).to.equal(tag);
  });
});
