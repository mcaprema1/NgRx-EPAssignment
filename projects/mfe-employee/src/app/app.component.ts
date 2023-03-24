import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../../lib-store/src/lib/lib-store.util';
import { Store } from '@ngrx/store';
import * as EmpActions from 'projects/lib-store/src/lib/actions/emp.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MFE-Employee';
  registerForm: FormGroup | any;
    submitted = false;
    SERVER_URL = 'https://09a89f92-edc2-46ae-8b50-65bf2d58fab9.mock.pstmn.io/employee/save';
    fullList :any
    // private store: Store<AppState>

    constructor(private formBuilder: FormBuilder,  private http: HttpClient,
        private store: Store<AppState>) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            empId: ['', Validators.required],
            first_name: ['', [Validators.required, Validators.minLength(3)]],
            last_name: ['', Validators.required],
            emailID: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
            address: [''],
            Active:['']
        });
    }
    get f() { return this.registerForm.controls; }

    onSubmit() {
        if (this.registerForm.invalid) {
                return;
        }
        this.submitted = true;
        const requestOptions: Object = {
           responseType: 'text',
          'Content-Type': 'application/json'
        }
    this.http.post<any>(this.SERVER_URL, this.registerForm.value, requestOptions).subscribe
    ({
        next : (res) => {
            let temp = JSON.parse(res)
            this.store.dispatch(new EmpActions.CreateEmployee(temp));
        },
        error : (err) => console.log("err : ", err)
    })
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

    view(){
        this.store.dispatch(new EmpActions.getEmployees('kk'));
        this.store.subscribe((data) =>{
            // console.log("view store 1: ", data )
            this.fullList = data.empStore;
            console.log("view store 67: ", this.fullList );
          });
    }
}
