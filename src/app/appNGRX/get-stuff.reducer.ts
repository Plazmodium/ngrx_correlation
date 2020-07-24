import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { loadGetStuffs, loadGetStuffsSuccess, loadGetStuffsFailure, loadComments, loadCommentsSuccess, loadCommentsFailure, initiate, initiateSuccess, initiateFailure} from './get-stuff.actions';
import { IPostsResponse } from '../Models/posts.model';
import { AppState } from '../reducers';
import { ICommentsResponse } from '../Models/comments.models';

export const getStuffFeatureKey = 'getStuff';

export interface IGetStuffState {
  posts: IPostsResponse[];
  comments: ICommentsResponse[];
  aggregatedResponse: any;
  error: any;
  isLoading: boolean;
}

export const initialState: IGetStuffState = {
  posts: undefined,
  comments: undefined,
  aggregatedResponse: undefined,
  error: undefined,
  isLoading: false,
};


export const getStuffReducer = createReducer(
  initialState,

  on(loadGetStuffs, state => ({ ...state, isLoading: true })),
  on(loadGetStuffsSuccess, (state, action) => ({ ...state, posts: action.postData, isLoading: false })),
  on(loadGetStuffsFailure, (state, action) => ({ ...state, error: action.error, isLoading: false })),

  on(loadComments, state => ({ ...state, isLoading: true })),
  on(loadCommentsSuccess, (state, action) => ({ ...state, comments: action.commentsData, isLoading: false })),
  on(loadCommentsFailure, (state, action) => ({ ...state, error: action.error, isLoading: false })),

  on(initiate, state => ({ ...state, isLoading: true })),
  on(initiateSuccess, (state, action) => ({ ...state, aggregatedResponse: action.data, isLoading: false })),
  on(initiateFailure, (state, action) => ({ ...state, error: action.error, isLoading: false }))
);

export function reducer(state: IGetStuffState | undefined, action: Action) {
  return getStuffReducer(state, action);
}
// extract
export const retrievedPosts = (state: IGetStuffState) => {
  return state.posts;
};
export const retrieveComments = (state: IGetStuffState) => {
  return state.comments;
};
export const retrieveAggregation = (state: IGetStuffState) => {
  return state.aggregatedResponse;
};

// select
export const rootState = createFeatureSelector<AppState, IGetStuffState>(
  getStuffFeatureKey
);

export const getStuff = createSelector(rootState, state => state[getStuffFeatureKey]);
export const getPosts = createSelector(rootState, retrievedPosts);
export const getComments = createSelector(rootState, retrieveComments);
export const getAggregation = createSelector(rootState, retrieveAggregation);

