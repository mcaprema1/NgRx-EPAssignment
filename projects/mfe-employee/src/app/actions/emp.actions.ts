import { Action } from '@ngrx/store';
import { Employee } from '../../../../model/employee.model';
// import { Projects, AssignedProjects } from '../models/projects.modal';

export const ADD_EMP = 'Add Emp';
export const UPDATE_EMP = 'Remove Emp';
export const ADD_PROJECT = 'Add Projects';
export const UPDATE_PROJECT = 'Update Projects';
export class AddEmp implements Action {
    readonly type = ADD_EMP;
    constructor(public payload: Employee) {
        console.log("add demo action ", this.type);
    }
}

export class updateEmp implements Action {
    readonly type = UPDATE_EMP;
    constructor(public payload: number) {}
}
// export class AddProjects implements Action {   
//     readonly type = ADD_PROJECT;
//     constructor(public payload: Projects) {
//         console.log("add Proj action ", this.type);
//     }
// }
// export class UpdateProjects implements Action {   
//     readonly type = UPDATE_PROJECT;
//     constructor(public payload: AssignedProjects) {
//         console.log("Update action ", this.type);
//     }
// }
export type Actions = AddEmp | updateEmp;