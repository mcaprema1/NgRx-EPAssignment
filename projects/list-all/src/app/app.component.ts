import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { debounceTime, map, distinctUntilChanged, filter, startWith,
  pluck, switchMap, tap } from "rxjs/operators";
import {combineLatest, Observable, of, fromEvent, Subject, ReplaySubject} from 'rxjs';
import { Employee } from '../../../model/employee.model';
import { FormControl } from '@angular/forms';
import { ApiService } from 'projects/service/api.service';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'projects/mfe-employee/src/app/app.state';
import * as EmpActions from '../../../mfe-employee/src/app/actions/emp.actions';


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
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ListAll';
  // listOfEmployee : Employee=[];
  public listOfEmployee : any = [];
  
  // listOfEmployee:Observable<string[]> | any;
  SERVER_URL = 'https://run.mocky.io/v3/116d8cce-4e3f-446e-9de0-ea2d5b015f4e';
  
  @ViewChild('search', { static: false }) searchInput: ElementRef | any;

  employees$: Observable<Employee[]> | undefined;
  // filteredEmployee$: Observable<Employee[]> | undefined;
  // filter: FormControl | undefined;
  // filter$: Observable<string> | undefined;
  // companies$: Observable<Company[]>;
  private searchTerms = new Subject<string>();

  // public paymentTermsMultiCtrl: FormControl = new FormControl();
  // public paymentTermsMultiFilterCtrl: FormControl = new FormControl();
  // public filteredpaymentTermsMulti: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  protected _onDestroy = new Subject<void>();
  constructor(private http: HttpClient, private apiService : ApiService, private store: Store<{empStore: Employee[]}>) { }

ngOnInit() {
  this.http.get<any>(this.SERVER_URL).subscribe(res =>{
    this.listOfEmployee = res;
    console.log("listOfEmployee ", this.listOfEmployee)
})
this.store.dispatch(new EmpActions.AddEmp({...this.listOfEmployee
  }))
  let assignedProjects = this.store.select('empStore');
   assignedProjects.subscribe(data =>{
    console.log("store Value : ", data);
    
  })
}
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

searchRequest(changedValue: string): any {
  return of(
    this.listOfEmployee.filter((x : any) =>
      x.toLowerCase().includes(changedValue.toLowerCase())
    )
  );
}

// this.employees$ = this.searchTerms.pipe(
//   debounceTime(300),
//   distinctUntilChanged(),
//   startWith(''),
//   switchMap((term: string) => this.companyService.searchCompanies(term)),
// );
}

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

