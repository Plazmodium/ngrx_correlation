import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "./reducers";
import { loadGetStuffs, loadComments, initiate } from "./appNGRX/get-stuff.actions";
import { Observable } from "rxjs";
import { IPostsResponse } from "./Models/posts.model";
import * as fromRootReducer from "./appNGRX/get-stuff.reducer";
import { UtilsService, CorrelationParams } from "./services/utils.service";
// import * as fromRootReducer from './reducers';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  post$: Observable<any>;
  data1: any;
  data1TestVar: string;
  data2: any;
  data2TestVar: string;
  aggregatedData: any;
  aggregateTestVar: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const correlationParams = CorrelationParams.create();
    // this.store.dispatch(loadGetStuffs({ correlationId: correlationParams }));
    // this.store.pipe(select(fromRootReducer.getPosts)).subscribe(x => {
    //   this.data1 = x;
    //   if (x !== undefined) {
    //     x.forEach(postDetail => (this.data1TestVar = postDetail.title));
    //   }
    // });

    // this.store.dispatch(loadComments({ correlationId: correlationParams }));
    // this.store.pipe(select(fromRootReducer.getComments)).subscribe(x => {
    //   this.data2 = x;
    //   if (x !== undefined) {
    //     x.forEach(postDetail => (this.data2TestVar = postDetail.name));
    //   }
    // });

    this.store.dispatch(initiate({ correlationId: correlationParams }));
    this.store.pipe(select(fromRootReducer.getAggregation)).subscribe(x => {
      console.log('app component aggregate returned data', x);
      this.aggregatedData = x;
      if (x !== undefined) {
        x.forEach(postDetail => (this.aggregateTestVar = postDetail.name));
      }
    });
  }
}
