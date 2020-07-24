import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as getStuffActions from "./get-stuff.actions";
import { HttpClient } from "@angular/common/http";
import {
  concatMap,
  tap,
  flatMap,
  retry,
  catchError,
  mergeMap,
  map,
  first,
  switchMap,
  filter,
} from "rxjs/operators";
import { of, race, forkJoin, throwError, merge } from "rxjs";
import { IPostsResponse } from "../Models/posts.model";
import { ICommentsResponse } from "../Models/comments.models";
import * as fromActions from "./get-stuff.actions";
import { filterAggregatableAction } from "../services/utils.service";

@Injectable()
export class GetStuffEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  initiate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getStuffActions.initiate),
      flatMap(action => {
        const { correlationId } = action;
        return [
          fromActions.loadGetStuffs({ correlationId }),
          fromActions.loadComments({ correlationId })
        ];
      })
    )
  );

  aggregate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getStuffActions.initiate),
      switchMap(action => {

        //#region POSTS
        const post$ = this.actions$.pipe(
          ofType(getStuffActions.loadGetStuffsSuccess),
          filter(posts => filterAggregatableAction(action, posts)),
          first()
        );
        console.log('here 1', post$);
        //#endregion

        //#region COMMENTS
        const comment$ = this.actions$.pipe(
          ofType(getStuffActions.loadCommentsSuccess),
          filter(comments => filterAggregatableAction(action, comments)),
          first()
        );
        console.log('here 2', comment$);
        //#endregion

        //#region FAIL ACTION $
        let failAction$ = this.actions$.pipe(
          ofType(
            getStuffActions.loadGetStuffsFailure,
            getStuffActions.loadCommentsFailure
          ),
          filter((failAction: any) => {
            return filterAggregatableAction(action, failAction);
          }),
          first(),
          switchMap(failAction => {
            return throwError(failAction.error);
          })
        );
        //#endregion

        console.log('here 3', failAction$);
        return of(merge(forkJoin([post$, comment$]), failAction$));
        //return of(merge(post$, comment$, failAction$));
        // return of(race(forkJoin([post$, comment$]), failAction$));
        
      }),
      map((data) => {
        // data.pipe(
        //   tap(x => {
        //     console.log('here 5', x);
        //   }),
        // );
        data.subscribe(y => console.log('y', y));
        
        const comments = data[1];
        // const { postData } = data[0];
        // const { commentsData } = data[1];

        console.log("postData", comments);

        if (comments !== undefined) {
          return fromActions.initiateSuccess({ data: comments });
        } else {
          return fromActions.initiateSuccess({ data: ["Not Working"] });
        }
      }),
      catchError(error => {
        console.log('ERROR: ', error);
        return of(fromActions.initiateFailure(error));
      })
    )
  );

  getpost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getStuffActions.loadGetStuffs),
      mergeMap(action =>
        this.http.get("https://jsonplaceholder.typicode.com/posts").pipe(
          flatMap((response: IPostsResponse[]) =>
            of(getStuffActions.loadGetStuffsSuccess({ postData: response }))
          ),
          catchError(error => {
            return of(getStuffActions.loadGetStuffsFailure(error));
          })
        )
      )
    )
  );

  getComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getStuffActions.loadComments),
      mergeMap(action =>
        this.http.get("https://jsonplaceholder.typicode.com/comments").pipe(
          flatMap((response: ICommentsResponse[]) =>
            of(getStuffActions.loadCommentsSuccess({ commentsData: response }))
          ),
          catchError(error => {
            return of(getStuffActions.loadCommentsFailure(error));
          })
        )
      )
    )
  );
}
