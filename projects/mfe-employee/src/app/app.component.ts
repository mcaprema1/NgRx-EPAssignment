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
    SERVER_URL = 'https://09a89f92-edc2-46ae-8b50-65bf2d58fab9.mock.pstmn.io/employee/save';

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
            Active:['']
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        // if (this.registerForm.invalid) {
        //     return;
        // }
        const formData = new FormData();
    formData.append('empdata',JSON.stringify(this.registerForm.value));
       
        const emp= {"first_name":"Prema"}
        
        console.log("formdata : ", emp, typeof(formData),formData);
        // const emp= [{"empId":"11025","first_name":"Prema","last_name":"palanisamy","emailID":"prema@gmail.com","mobile":1234567890,"address":"omr","Active":true}]
        // {"empId":"11020","first_name":"Ram","last_name":"Santhanam","emailID":"ram@gmail.com","mobile":2234567890,"adress":"omr","Active":true}]
        // JSON.stringify(this.registerForm.value)
        let body = JSON.stringify(this.registerForm.value);
        let headers = new Headers({'Content-Type': 'application/json'});
        // let options: {
        //     headers?: HttpHeaders | {[header: string]: string | string[]},
        //     observe?: 'body' | 'events' | 'response',
        //     params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
        //     reportProgress?: boolean,
        //     responseType?: 'arraybuffer'|'blob'|'json'|'text',
        //     withCredentials?: boolean,
        // }


    this.http.post<any>(this.SERVER_URL, JSON.stringify(this.registerForm.value), { responseType: 'json' }).subscribe
    ({
        next : (res) => {
            console.log("res ", res, typeof(res), res.response )
            let temp = JSON.parse(JSON.stringify(res));
            // console.log("temp type ", typeof(temp));
            console.log("temp : ", temp,typeof(temp) )},
        error : (err) => console.log("err : ", err)
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
