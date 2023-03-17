import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Employee, Project } from '../../../model/employee.model'

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
    EMPLOYEES_GET_URL = 'https://run.mocky.io/v3/116d8cce-4e3f-446e-9de0-ea2d5b015f4e';
    PROJECTS_GET_URL = 'https://run.mocky.io/v3/c4da6857-f8ed-493d-8e61-e5ee346bf592';
    constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

    ngOnInit() {
        this.projectForm = this.formBuilder.group({
            projectId: ['', Validators.required],
            projectName: ['', Validators.required],
            description: [''],
        });
        this.http.get<any>(this.EMPLOYEES_GET_URL).subscribe(res =>{
            this.listOfEmployee = res;
            console.log("listOfEmployee ", this.listOfEmployee)
        })
        this.http.get<any>(this.PROJECTS_GET_URL).subscribe(res =>{
            this.listOfProject = res;
            console.log("listOfProject ", this.listOfProject)
        })
    }

    // convenience getter for easy access to form fields
    get f() { return this.projectForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.projectForm.invalid) {
            return;
        }

        // display form values on success
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    onReset() {
        this.submitted = false;
        this.projectForm.reset();
    }
    selectedEmplolee(event : any){

    }

    selectedProject(event : any, row : any, i : number){
        row.assigned_Project=event.target.value
        console.log("vvv : ", this.listOfEmployee);
    }
    

}
