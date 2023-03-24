import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectState } from '../../../lib-store/src/lib/lib-store.util';
import { Store } from '@ngrx/store';
import * as ProActions from 'projects/lib-store/src/lib/actions/project.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MFE-Projects';
  projectForm: FormGroup | any;
    submitted = false;
    public listOfEmployee : any = [];
    public listOfProject : any =[]
    public employee : string | any;
    public project : string | any;
    // EMPLOYEES_GET_URL = 'https://run.mocky.io/v3/116d8cce-4e3f-446e-9de0-ea2d5b015f4e';
    // PROJECTS_GET_URL = 'https://run.mocky.io/v3/c4da6857-f8ed-493d-8e61-e5ee346bf592';
    POSTMAN_PROJECT_URL = 'https://09a89f92-edc2-46ae-8b50-65bf2d58fab9.mock.pstmn.io/project/save';
    constructor(private formBuilder: FormBuilder, private http: HttpClient,
        private store: Store<ProjectState>) { }

    ngOnInit() {
        this.projectForm = this.formBuilder.group({
            projectId: ['', Validators.required],
            projectName: ['', Validators.required],
            description: [''],
        });
        // this.http.get<any>(this.EMPLOYEES_GET_URL).subscribe(res =>{
        //     this.listOfEmployee = res;
        //     console.log("listOfEmployee ", this.listOfEmployee)
        // })
        // this.http.get<any>(this.PROJECTS_GET_URL).subscribe(res =>{
        //     this.listOfProject = res;
        //     console.log("listOfProject ", this.listOfProject)
        // })
    }
    get f() { return this.projectForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.projectForm.invalid) {
            return;
        }
        // const formData = new FormData();
        // formData.append('projectdata',JSON.stringify(this.projectForm.value));
        const requestOptions: Object = {
           responseType: 'text',
          'Content-Type': 'application/json'
        }
    this.http.post<any>(this.POSTMAN_PROJECT_URL, this.projectForm.value, requestOptions).subscribe
    ({
        next : (res) => {
            console.log("res  project : ", res);
            
            let temp = JSON.parse(res)
            this.store.dispatch(new ProActions.CreateProject(temp));
        },
        error : (err) => console.log("err : ", err)
    })
    }

    onReset() {
        this.submitted = false;
        this.projectForm.reset();
    }

}
