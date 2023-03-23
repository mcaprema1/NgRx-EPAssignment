import { Action } from '@ngrx/store';
import { Employee } from "../model/employee.model";
import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
  SAVE = '[Employee] SAVE Requested',
  SAVE_SUCCESS = '[Employee] SAVE Success',
  ERROR = '[Employee] Error',
  CREATE = '[Employee] CREATE Requested',
  GET_SUCCESS = '[Employee] GET Success',
  GET = '[Employee] GET Requested'
}


// export const ADD_EMP = 'Add Emp';
// export const UPDATE_EMP = 'Remove Emp';
// export const ADD_PROJECT = 'Add Projects';
// export const UPDATE_PROJECT = 'Update Projects';
// export class AddEmp implements Action {
//     readonly type = ADD_EMP;
//     constructor(public payload: Employee) {
//         console.log("add demo action ", this.type);
//     }
// }

// export class updateEmp implements Action {
//     readonly type = UPDATE_EMP;
//     constructor(public payload: number) {}
// }
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
// export const getComics = createAction('[Comics] Get comics');
// export const getComicsSuccess = createAction(
//   '[Comics] Success Get Comics',
//   (comics: any) => comics
// );

// export const saveEmployees = createAction('[Employee] save Employees to Store');
// export const saveEmployeesSuccess = createAction(
//   '[Employee] save Employees',
//   (emps: any) => emps
// );
export class SaveAction implements Action {
 readonly type = ActionTypes.SAVE;
  // constructor(public payload: { task: Employee }) { console.log("save action");}
  constructor(public payload: Employee[]) {  console.log("save user") };
}

export class SaveActionSuccess implements Action {
  type = ActionTypes.SAVE_SUCCESS;
  constructor(public payload: Employee[] ) { console.log("save action SUCCESS") }
}

export class ErrorAction implements Action {
  type = ActionTypes.ERROR;
  constructor(public payload: any) { }
}
export class CreateEmployee implements Action {
  type = ActionTypes.CREATE;
  constructor(public payload: Employee) { console.log("create user");
   }
  }

export class loadEmployeeSuccess implements Action{
    type = ActionTypes.GET_SUCCESS;
    // props<{ gallery: GalleryEntity[] }>()
    constructor(public payload: any) {  console.log("LOAD emp success") }
};

export class getEmployees implements Action {
  type = ActionTypes.GET;
  constructor(public payload: any) { console.log("get user")};  
};


export type EmpAction = SaveAction | SaveActionSuccess
  | ErrorAction | CreateEmployee | loadEmployeeSuccess | getEmployees;