import * as fromGetStuff from './get-stuff.actions';

describe('loadGetStuffs', () => {
  it('should return an action', () => {
    expect(fromGetStuff.loadGetStuffs().type).toBe('[GetStuff] Load GetStuffs');
  });
});
