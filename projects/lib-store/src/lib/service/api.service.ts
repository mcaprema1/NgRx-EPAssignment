import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Employee } from '../model/employee.model'
import { Store } from '@ngrx/store';
import { AppState } from '../lib-store.util';

@Injectable()
export class ApiService {

  state$: Observable<AppState> | undefined ;
  // state$ =[];
  constructor(private http: HttpClient, private store: Store<AppState>) { }
    
  SERVER_URL = 'https://run.mocky.io/v3/022060ea-4c7c-4043-842b-7a776b5f52f9';
//   innerClock = 0;
//   formdata$ = new BehaviorSubject<Employee>();
//   clock = this.formdata$.asObservable();
//   getFormData = () => {
//     this.innerClock++;
//     this.formdata$.next(this.innerClock);
//   }
saveStore() {
  return this.http.get<Employee[]>(this.SERVER_URL).pipe(
    delay(1000)
  )
}
// save(record: Employee[]) {
//   console.log("save api service", record);
//   return of(record);
// }
getStore(){
  console.log("get store service", );
  let state$;
  this.store.select(state => state).subscribe(state => {
    console.log("dddd",state.empStore);
    state$ = state.empStore
    // return state.empStore
  });
  return state$= this.store.select((store) => store.empStore);
  // return this.http.get<Employee[]>(this.SERVER_URL).pipe(delay(1000));
}

}
