import { Component, ViewChild, ElementRef, PipeTransform } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { debounceTime, map, distinctUntilChanged, filter, startWith,
   switchMap, tap, delay } from "rxjs/operators";
import {combineLatest, Observable, of, fromEvent, Subject, ReplaySubject} from 'rxjs';
import { Employee } from '../../../lib-store/src/lib/model/employee.model';
import { empReducer, EmployeeState } from '../../../lib-store/src/lib/reducers/emp.reducer';
import { FormControl } from '@angular/forms';
// import { ApiService } from 'projects/service/api.service';
import { takeUntil } from 'rxjs/operators';
import { Store , select} from '@ngrx/store';
import { AppState } from '../../../lib-store/src/lib/lib-store.util';
import { DecimalPipe } from "@angular/common";
import { selectEmployees } from 'projects/lib-store/src/lib/selectors/emp.selector';
import * as EmpActions from 'projects/lib-store/src/lib/actions/emp.actions';

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

  Employeelist$:Observable<Employee[]> | any;
  

  SERVER_URL = 'https://run.mocky.io/v3/e0183205-f538-45e2-85b1-20bf565280f2';
  PROJECTS_GET_URL = 'https://run.mocky.io/v3/c4da6857-f8ed-493d-8e61-e5ee346bf592';

  @ViewChild('search', { static: false }) searchInput: ElementRef | any;

  protected _onDestroy = new Subject<void>();
  @ViewChild('SearchInput', { static: true }) movieSearchInput!: ElementRef;
  apiResponse: any;
  isSearching: boolean |any;
  viewStore=false;
 
  // employees$ : any =[]
  employees$: Observable<Employee[]> =this.http.get<any>(this.SERVER_URL).pipe(delay(1000),
    tap((emps) => this.employeesList = emps) );
  // countries$: Observable<Country[]>;
  filteredEmployee$ : Observable<Employee[]> | undefined;
  filter = new FormControl("");
  employeesList : Employee[];
  empStores : any =[] ;
  fullList$: Observable<Employee[]> | undefined;
  projects$ = this.http.get<any>(this.PROJECTS_GET_URL).subscribe(res =>{
    this.listOfProject = res;
    console.log("listOfProject ", this.listOfProject)
})


  constructor(private http: HttpClient,private store: Store<AppState>, pipe : DecimalPipe) {

      this.employeesList =[];
      // this.store.subscribe((data) =>{
      //   console.log("EMp store fullList : ", data);
      //   this.fullList=data.empStore
      // });

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
     }

ngOnInit() {
  this.Employeelist$ = this.store.pipe(select(selectEmployees));

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
  // const emp= [{"empId":"1","first_name":"Prema","last_name":"palanisamy","emailID":"prema@gmail.com","mobile":1234567890,"address":"omr","Active":true},
  //       {"empId":"2","first_name":"Ram","last_name":"Santhanam","emailID":"ram@gmail.com","mobile":2234567890,"address":"omr","Active":true}]
       
  // this.store.dispatch(new EmpActions.saveEmployees(...eps))
  // this.employeesList.forEach(emp =>{
    // this.store.dispatch(new EmpActions.SaveAction(this.employeesList));
  // })
  // alert("Data saved in Store")
  this.viewStore=true;
}

selectedProject(event : any, row : any, i : number){
  row.projectId=event.target.value
  console.log("vvv : ", row, this.employeesList);
}
viewEmployeeStore(){
  console.log("innnnks");
  console.log("this.Employeelist$ : ", this.Employeelist$);
  
  this.store.dispatch(new EmpActions.getEmployees('jj'));

  //  this.store.subscribe((data) =>{
  //   this.fullList = data.empStore;
  //   console.log("view store 1: ", this.fullList );
  // });
  this.store.select(state => state).subscribe(state => console.log("dddd",{ state }));
  this.fullList$ = this.store.select((store) => store.empStore);
  console.log("view store2 : ", this.fullList$);
}
}
