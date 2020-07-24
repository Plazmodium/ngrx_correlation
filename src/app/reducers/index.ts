import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromGetStuff from '../appNGRX/get-stuff.reducer';

export interface AppState {

  [fromGetStuff.getStuffFeatureKey]: fromGetStuff.IGetStuffState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromGetStuff.getStuffFeatureKey]: fromGetStuff.reducer,
};
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
