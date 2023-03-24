import {ApiService} from '../service/api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { Actions, ofType , createEffect} from '@ngrx/effects'
import {catchError, map, switchMap, mergeMap, exhaustMap} from 'rxjs/operators';
import {of} from 'rxjs'
import * as Action from '../actions/project.actions';

@Injectable()
export class ProjectEffects {
  constructor(private apiService: ApiService, private _actions: Actions) { 
    console.log("effects constructor ");
  }

      saveEmps$ = createEffect(() =>this._actions.pipe(
      ofType<Action.CreateProject>(Action.ActionTypes.CREATE),
      map(action => action.payload),
      mergeMap(payload => 
        this.apiService.getStore().pipe(
          map(res => new Action.CREATEProjectSuccess( res )),
          catchError(error => this.handleError(error)))
        ) ) ) ;
      private handleError(error : any) {
        return of(new Action.ErrorAction(error));
      }
  
      loadEmp$ = createEffect(() => this._actions.pipe(
    ofType<Action.getProjects>(Action.ActionTypes.GET_SUCCESS),
    map(action => action.payload),
    mergeMap(payload => 
      this.apiService.getStore().pipe(
        map(res => new Action.loadProjectSuccess( res )),
        catchError(error => this.handleError(error)))
      ) ) ) ;
}
