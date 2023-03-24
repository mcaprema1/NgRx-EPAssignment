import { Action } from '@ngrx/store';
import { Employee } from "../model/employee.model";
import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
  SAVE = '[Employee] SAVE Requested',
  SAVE_SUCCESS = '[Employee] SAVE Success',
  ERROR = '[Employee] Error',
  CREATE = '[Employee] CREATE Requested',
  CREATE_SUCCESS = '[Employee] CREATE Success',
  GET_SUCCESS = '[Employee] GET Success',
  GET = '[Employee] GET Requested'
}

export class SaveAction implements Action {
 readonly type = ActionTypes.SAVE;
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
  export class CreateEmployeeSuccess implements Action {
    type = ActionTypes.CREATE_SUCCESS;
    constructor(public payload: Employee[] ) { console.log("CREATE action SUCCESS") }
  }

export class loadEmployeeSuccess implements Action{
    type = ActionTypes.GET_SUCCESS;
    constructor(public payload: any) {  console.log("LOAD emp success") }
};

export class getEmployees implements Action {
  type = ActionTypes.GET;
  constructor(public payload: any) { console.log("get user")};  
};


export type EmpAction = ErrorAction | CreateEmployee |CreateEmployeeSuccess | loadEmployeeSuccess | getEmployees
 | SaveAction | SaveActionSuccess