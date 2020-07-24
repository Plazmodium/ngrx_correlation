import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GetStuffEffects } from './get-stuff.effects';

describe('GetStuffEffects', () => {
  let actions$: Observable<any>;
  let effects: GetStuffEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetStuffEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(GetStuffEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
