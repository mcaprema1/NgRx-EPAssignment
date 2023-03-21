import { Component, ViewChild, ElementRef, PipeTransform } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { debounceTime, map, distinctUntilChanged, filter, startWith,
   switchMap, tap, delay } from "rxjs/operators";
import {combineLatest, Observable, of, fromEvent, Subject, ReplaySubject} from 'rxjs';
import { Employee } from '../../../model/employee.model';
import { FormControl } from '@angular/forms';
import { ApiService } from 'projects/service/api.service';
import { takeUntil } from 'rxjs/operators';
import { Store , select} from '@ngrx/store';
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
  public listOfProject : any =[];
  public fullList : any = []
  full : any =[];

  // listOfEmployee:Observable<string[]> | any;
  SERVER_URL = 'https://run.mocky.io/v3/e0183205-f538-45e2-85b1-20bf565280f2';
  PROJECTS_GET_URL = 'https://run.mocky.io/v3/c4da6857-f8ed-493d-8e61-e5ee346bf592';

  @ViewChild('search', { static: false }) searchInput: ElementRef | any;

  protected _onDestroy = new Subject<void>();
  @ViewChild('SearchInput', { static: true }) movieSearchInput!: ElementRef;
  apiResponse: any;
  isSearching: boolean |any;
  viewStore=false;

  employees$: Observable<Employee[]> =this.http.get<any>(this.SERVER_URL).pipe(delay(1000),
    tap((emps) => this.employeesList = emps) );
  // countries$: Observable<Country[]>;
  filteredEmployee$ : Observable<Employee[]> | undefined;
  filter = new FormControl("");
  employeesList : Employee[];
  empStores : any =[] ;

  projects$ = this.http.get<any>(this.PROJECTS_GET_URL).subscribe(res =>{
    this.listOfProject = res;
    console.log("listOfProject ", this.listOfProject)
})


  constructor(private http: HttpClient, private apiService : ApiService, private store: Store<AppState>, pipe : DecimalPipe) {

      this.employeesList =[];
      this.filteredEmployee$ = this.filter.valueChanges.pipe(
        startWith(""),
        distinctUntilChanged(),
        debounceTime(1000),
        map(text => {
         let text1= text ? text : '';
          return this.search(text1, pipe);
        })
      );
      console.log("jjj:", this.employees$, this.filteredEmployee$);
      this.empStores = store.select('empStore');
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
return this.employeesList.filter(list  => {
  // console.log("fff : ", list)
  const term = text.toLowerCase();
  return (
    list.empId.toLowerCase().includes(term) ||
    list.first_name.toLowerCase().includes(term) ||
    list.last_name.toLowerCase().includes(term) ||
    list.emailID.toLowerCase().includes(term) ||
    list.address.toLowerCase().includes(term) ||
    // list.Active.valueOf() ||
    // list.Active.valueOf()? String(list.Active).includes('true') : String(list.Active).includes('false')  ||
    pipe.transform(list.mobile).includes(term)
  );
});
// }

}

saveToStore(){
  // this.store.dispatch(new EmpActions.saveEmployees(...eps))
  this.employeesList.forEach(emp =>{
    this.store.dispatch(new EmpActions.SaveAction(emp));
  })
  alert("Data saved in Store")
  this.viewStore=true;
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

selectedProject(event : any, row : any, i : number){
  row.projectId=event.target.value
  console.log("vvv : ", row, this.employeesList);
}
viewEmployeeStore(){
  console.log("innnnks");
   this.store.subscribe((data) =>{
    this.fullList= data.empStore;
    console.log("view store : ", this.fullList);
  });
}
}
