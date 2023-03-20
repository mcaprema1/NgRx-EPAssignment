import { Component, ViewChild, ElementRef, PipeTransform } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { debounceTime, map, distinctUntilChanged, filter, startWith,
   switchMap, tap, delay } from "rxjs/operators";
import {combineLatest, Observable, of, fromEvent, Subject, ReplaySubject} from 'rxjs';
import { Employee } from '../../../model/employee.model';
import { FormControl } from '@angular/forms';
import { ApiService } from 'projects/service/api.service';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'projects/mfe-employee/src/app/app.state';
import * as EmpActions from '../../../mfe-employee/src/app/actions/emp.actions';
import { DecimalPipe } from "@angular/common";

const PARAMS = new HttpParams({
  fromObject: {
    action: "opensearch",
    format: "json",
    origin: "*"
  }
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DecimalPipe]
})
export class AppComponent {
  title = 'ListAll';
  // listOfEmployee : Employee=[];
  public listOfEmployee : any = [];

  // listOfEmployee:Observable<string[]> | any;
  SERVER_URL = 'https://run.mocky.io/v3/116d8cce-4e3f-446e-9de0-ea2d5b015f4e';

  @ViewChild('search', { static: false }) searchInput: ElementRef | any;

  protected _onDestroy = new Subject<void>();
  @ViewChild('SearchInput', { static: true }) movieSearchInput!: ElementRef;
  apiResponse: any;
  isSearching: boolean |any;

  employees$: Observable<Employee[]> =this.http.get<any>(this.SERVER_URL).pipe(delay(1000),
    tap((emps) => this.employeesList = emps) );
  // countries$: Observable<Country[]>;
  filteredEmployee$ : Observable<Employee[]> | undefined;
  filter = new FormControl("");
  employeesList : Employee[];

  empStores$ = this.store.select('empStore');

  constructor(private http: HttpClient, private apiService : ApiService, private store: Store<AppState>, pipe : DecimalPipe) {

      this.employeesList =[];
      this.filteredEmployee$ = this.filter.valueChanges.pipe(
        startWith(""),
        map(text => {
         let text1= text ? text : '';
          return this.search(text1, pipe);
        })
      );
      console.log("jjj:", this.employees$, this.filteredEmployee$);


    //   this.http.get<any>(this.SERVER_URL).subscribe(res =>{
    //     this.listOfEmployee = res;
    //     console.log("listOfEmployee ", this.listOfEmployee)
    // })

    // const asyncEmployees$ = of(this.listOfEmployee).pipe(
    //   delay(10000),
    //   tap(emps => (this.employeesList = emps))
    // );




      // fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(

      //   // get value
      //   map((event: any) => {
      //     console.log("event.target.value : ", event.target.value);

      //     return event.target.value;
      //   })
      //   , filter(res => res.length > 2)
      //   , debounceTime(1000)
      //   , distinctUntilChanged()
      // ).subscribe((text: string) => {
      //   this.isSearching = true;
      //   this.searchGetCall(text, pipe).subscribe(( res: any) => {
      //     console.log('res search  call', res);
      //     this.isSearching = false;
      //     this.apiResponse = res;
      //   }, (err: any) => {
      //     // this.isSearching = false;
      //     console.log('error', err);
      //   });

      // });

     }

ngOnInit() {


}

search(text: string, pipe: PipeTransform) : Employee[] {
  console.log("inn search call", text)
return this.employeesList.filter(country  => {
  const term = text.toLowerCase();
  return (
    country.empId.toLowerCase().includes(term) ||
    country.first_name.toLowerCase().includes(term) ||
    country.last_name.toLowerCase().includes(term) ||
    country.emailID.toLowerCase().includes(term) ||
    country.address.toLowerCase().includes(term) ||
    // country.Active.valueOf()||
    pipe.transform(Number(country.mobile)).includes(term)
  );
});
// }

}

saveToStore(){
  // this.store.dispatch(new EmpActions.saveEmployees(...eps))
  this.employeesList.forEach(emp =>{
    this.store.dispatch(new EmpActions.SaveAction({task : emp}));
  })
}
}
// this.store.dispatch(new EmpActions.AddEmp(...eps
//   ))
//   let assignedProjects = this.store.select('empStore');
//    assignedProjects.subscribe(data =>{
//     console.log("store Value : ", data);
//     alert(" Employee data has been saved in EmpStore !!!")
//   })

// ngAfterViewInit() {
//   fromEvent(this.searchInput.nativeElement, 'input')
//     .pipe(
//       debounceTime(500),
//       switchMap((value : any) => {
//         return this.searchRequest(value);
//       })
//     )
//     .subscribe((result: any) => {
//       this.resultList = result;
//     });
// }

// searchRequest(changedValue: string): any {
//   return of(
//     this.listOfEmployee.filter((x : any) =>
//       x.toLowerCase().includes(changedValue.toLowerCase())
//     )
//   );
// }

// this.employees$ = this.searchTerms.pipe(
//   debounceTime(300),
//   distinctUntilChanged(),
//   startWith(''),
//   switchMap((term: string) => this.companyService.searchCompanies(term)),
// );
// }

// search(){
//   this.employees$ = of(this.listOfEmployee);
//   this.filter = new FormControl('');
//   this.filter$ = this.filter.valueChanges.pipe(startWith(''));
//   this.filteredEmployee$ = combineLatest(this.employees$, this.filter$).pipe(
//     map(([this.listOfEmployee, filterString]) => this.listOfEmployee.filter(state =>
//       state.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
//   );
// }
// search(term: string): void {
//   this.searchTerms.next(term);
// }


