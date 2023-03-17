import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import * as DemoActions from './actions/emp.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MFE-Employee';
  registerForm: FormGroup | any;
    submitted = false;
    SERVER_URL = 'https://741dd49b-cd3a-4d43-a620-0643496680a5.mock.pstmn.io/employee';
    
    // private store: Store<AppState>
    
    constructor(private formBuilder: FormBuilder,  private http: HttpClient,
        ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            empId: ['', Validators.required],
            first_name: ['', [Validators.required, Validators.minLength(3)]],
            last_name: ['', Validators.required],
            emailID: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
            address: [''],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        const formData = new FormData();
    formData.append('empdata', this.registerForm.value);
        console.log("formdata : ", formData, this.registerForm.value);
        
        // const emp= [{"empId":"11025","first_name":"Prema","last_name":"palanisamy","emailID":"prema@gmail.com","mobile":"1234567890","address":"omr","Active":"true"},
        // {"empId":"11020","first_name":"Ram","last_name":"Santhanam","emailID":"ram@gmail.com","mobile":"2234567890","address":"omr","Active":"true"}]

    this.http.post<any>(this.SERVER_URL, JSON.stringify(formData)).subscribe(res =>{
        console.log("response ",res)
    })
     

        // display form values on success
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
        // this.store.dispatch(new DemoActions.AddEmp({
        //     empId : this.registerForm.firstName,
        //     first_name : this.registerForm.lastName,
        //     last_name : this.registerForm.firstName,
        //     emailID : this.registerForm.email,
        //     mobile : this.registerForm.mobile,
        //     address : this.registerForm.address
        // }))
        // console.log("this.store : ", this.store)
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
}
