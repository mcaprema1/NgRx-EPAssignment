import { Action } from "@ngrx/store";
import { Employee } from "../model/employee.model";
import { EmpAction, ActionTypes } from '../actions/emp.actions';
import { createReducer, on } from '@ngrx/store';

export const ENTITY_FEATURE_KEY = "entity";

export interface EmployeeState {
  empId: string
  first_name: string
  last_name: string
  emailID: string
  mobile: number
  address: string
  Active: boolean
  projectId?: string
}

const initialState: any = [];

export function empReducer(state = initialState, action: Action) {
  const tutorialAction = action as EmpAction;

  switch (action.type) {
    case ActionTypes.CREATE:
      // console.log("tutorialAction.payload : ", tutorialAction.payload, state);
      // alert("Record has been saved in Store", )
      return [...state, tutorialAction.payload];
    case ActionTypes.GET:
      // console.log("get inside", state, tutorialAction.payload);
      // this.store.select(state => state).subscribe(state => console.log("dddd",{ state }));
      return [...state];
    default:
      return state;
  }

}
