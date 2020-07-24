import { createAction, props } from '@ngrx/store';
import { IPostsResponse } from '../Models/posts.model';
import { ICommentsResponse } from '../Models/comments.models';

export const initiate = createAction(
  '[GetStuff] initiate',
  props<{ correlationId: any }>()
);

export const initiateSuccess = createAction(
  '[GetStuff] initiate response',
  props<{ data: any }>()
);

export const initiateFailure = createAction(
  '[GetStuff] initiate failure',
  props<{ error: any }>()
);

export const loadGetStuffs = createAction(
  '[GetStuff] Load GetStuffs',
  props<{ correlationId: any }>()
);

export const loadGetStuffsSuccess = createAction(
  '[GetStuff] Load GetStuffs Success',
  props<{ postData: IPostsResponse[] }>()
);

export const loadGetStuffsFailure = createAction(
  '[GetStuff] Load GetStuffs Failure',
  props<{ error: any }>()
);
export const loadComments = createAction(
  '[GetStuff] Load Comments',
  props<{ correlationId: any}>()
);

export const loadCommentsSuccess = createAction(
  '[GetStuff] Load Comments Success',
  props<{ commentsData: ICommentsResponse[] }>()
);

export const loadCommentsFailure = createAction(
  '[GetStuff] Load Comments Failure',
  props<{ error: any }>()
);
