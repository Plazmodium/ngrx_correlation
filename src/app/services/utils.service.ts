import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Action } from '@ngrx/store';

@Injectable()
export class UtilsService {
  correlationId: any;
  constructor() { }

  // generateCorelationID() {
  //   this.correlationId = uuidv4();
  //   return this.correlationId;
  // }
}

export class CorrelationParams {
  public correlationId?: string;

  public static create(): CorrelationParams {
    const correlationParams: CorrelationParams = {
      correlationId: uuidv4(),
    };

    return correlationParams;
  }

  public static fromAction(action: AggregatableAction): CorrelationParams {
    return action && action.payload && action.payload.correlationParams
      ? action.payload.correlationParams
      : null;
  }
}

export type AggregatableAction = Action & { payload?: { correlationParams?: CorrelationParams } };

export const filterAggregatableAction = (
  sourceAction: AggregatableAction,
  anotherAction: AggregatableAction,
) => {
  const sourceActionCorrelationParams = CorrelationParams.fromAction(sourceAction);
  const anotherActionCorrelationParams = CorrelationParams.fromAction(anotherAction);

  return (
    sourceActionCorrelationParams &&
    anotherActionCorrelationParams &&
    sourceActionCorrelationParams.correlationId === anotherActionCorrelationParams.correlationId
  );
};