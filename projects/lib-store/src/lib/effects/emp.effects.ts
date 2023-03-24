import {ApiService} from '../service/api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
// import {Action} from '@ngrx/store';
import { Actions, ofType , createEffect} from '@ngrx/effects'
// import {EmpAction, ActionTypes} from '../actions/emp.actions';
import {catchError, map, switchMap, mergeMap, exhaustMap} from 'rxjs/operators';
import {of} from 'rxjs'
import * as Action from '../actions/emp.actions';
// import { Employee } from 'projects/model/employee.model';

@Injectable()
export class EmployeeEffects {
  constructor(private apiService: ApiService, private _actions: Actions) { 
    console.log("effects constructor ");
  }
  // saveEmps$ = createEffect(() =>
  //   this._actions.pipe(
  //     ofType<Action.SaveAction>(Action.ActionTypes.SAVE),
  //     map(action => action.payload),
  //     mergeMap(payload => 
  //       this.apiService.save(payload).pipe(
  //         map(res => new Action.SaveActionSuccess( res )),
  //         catchError(error => this.handleError(error)))
  //       ) ) ) ;
  //     private handleError(error : any) {
  //       return of(new Action.ErrorAction(error));
  //     }

  // saveEmps$ = createEffect(() =>
  // getAllGames$: Observable<Action> = this.actions$.pipe(
  //   ofType(gameActions.GET_GAMES),
  //   switchMap(() => this.svc.findAll()),
  //   map(heroes => new GetAllGamesSuccess(heroes)),
  //   catchError((err) => [new GetAllGamesError(err)])
  // );

      saveEmps$ = createEffect(() =>this._actions.pipe(
      ofType<Action.CreateEmployee>(Action.ActionTypes.CREATE),
      map(action => action.payload),
      mergeMap(payload => 
        this.apiService.getStore().pipe(
          map(res => new Action.CreateEmployeeuccess( res )),
          catchError(error => this.handleError(error)))
        ) ) ) ;
      private handleError(error : any) {
        return of(new Action.ErrorAction(error));
      }
  
      loadEmp$ = createEffect(() => this._actions.pipe(
    ofType<Action.getEmployees>(Action.ActionTypes.GET_SUCCESS),
    map(action => action.payload),
    mergeMap(payload => 
      this.apiService.getStore().pipe(
        map(res => new Action.loadEmployeeSuccess( res )),
        catchError(error => this.handleError(error)))
      ) ) ) ;
   
}
