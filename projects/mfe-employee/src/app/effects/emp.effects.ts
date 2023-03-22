import {ApiService} from '../service/api.service';
import {Injectable} from '@angular/core';

import { Actions, ofType , createEffect} from '@ngrx/effects'
// import {EmpAction, ActionTypes} from '../actions/emp.actions';
import {catchError, map, switchMap, mergeMap, exhaustMap} from 'rxjs/operators';
import {of} from 'rxjs'
import * as Action from '../actions/emp.actions';
import { Employee } from 'projects/model/employee.model';

@Injectable()
export class EmployeeEffects {
  // saveEmployees$ = createEffect(() =>
  constructor(private apiService: ApiService, private _actions: Actions) { }

  saveEmps$ = createEffect(() =>
    this._actions.pipe(
      ofType<Action.SaveAction>(Action.ActionTypes.SAVE),
      map(action => action.payload),
      mergeMap(payload  =>
        this.apiService.save(payload).pipe(
          map(res => new Action.SaveActionSuccess( res )),
          catchError(error => this.handleError(error)))
      )));
      private handleError(error : any) {
        return of(new Action.ErrorAction(error));
      }
}
