import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Employee } from '../model/employee.model'

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

//   innerClock = 0;
//   formdata$ = new BehaviorSubject<Employee>();
//   clock = this.formdata$.asObservable();
//   getFormData = () => {
//     this.innerClock++;
//     this.formdata$.next(this.innerClock);
//   }
}