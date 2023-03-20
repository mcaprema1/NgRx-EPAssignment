import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Employee } from '../../../../model/employee.model'

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
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
save(record: Employee) {
  console.log("save api service", record);

  // let record= this.http.post<Task>(this.API_TASKS_URL, record);
  // record.id = `${++this.COUNT}`;
  return of(record);
}

}
