import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee.model'
import { Store } from '@ngrx/store';
import { AppState, ProjectState } from '../lib-store.util';

@Injectable()
export class ApiService {

  state$: Observable<AppState> | undefined;
  // state$ =[];
  constructor(private http: HttpClient, private store: Store<AppState>, private store1: Store<ProjectState>) { }

  SERVER_URL = 'https://run.mocky.io/v3/022060ea-4c7c-4043-842b-7a776b5f52f9';
  saveStore() {
    return this.http.get<Employee[]>(this.SERVER_URL).pipe(delay(1000)
    )
  }

  getStore() {
    let state$;
    return state$ = this.store.select((store) => store.empStore);
    // return this.http.get<Employee[]>(this.SERVER_URL).pipe(delay(1000));
  }

  getProjectStore() {
    let state$;
    return state$ = this.store1.select((store) => store.projectStore);
  }

}
