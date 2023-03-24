import { Action } from '@ngrx/store';
import { Project } from "../model/employee.model";
import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
  
  CREATE = '[Project] CREATE Project Requested',
  CREATE_SUCCESS  = '[Project] CREATE Project Success',
  GET_SUCCESS = '[Project] GET Project Success',
  GET = '[Project] GET Project Requested',
  ERROR = '[Project] Error',
}
   
   export class CreateProject implements Action {
     type = ActionTypes.CREATE;
     constructor(public payload: Project) { console.log("create PROJ");
      }
    }
   
    export class CREATEProjectSuccess implements Action{
        type = ActionTypes.CREATE_SUCCESS;
        constructor(public payload: any) {  console.log("create PROJ success") }
    };   
   
   export class getProjects implements Action {
    type = ActionTypes.GET;
    constructor(public payload: any) { console.log("get proj")};  
  };

  export class loadProjectSuccess implements Action{
    type = ActionTypes.GET_SUCCESS;
    constructor(public payload: any) {  console.log("LOAD proj success") }
};
     
   export class ErrorAction implements Action {
    type = ActionTypes.ERROR;
    constructor(public payload: any) { }
  }
   
   export type EmpAction = ErrorAction | CreateProject | CREATEProjectSuccess | loadProjectSuccess | getProjects;
   