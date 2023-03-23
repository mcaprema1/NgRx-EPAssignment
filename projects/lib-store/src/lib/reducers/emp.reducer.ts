import { Action } from "@ngrx/store";
import { Employee } from "../model/employee.model";
import {EmpAction, ActionTypes} from '../actions/emp.actions';
import { createReducer, on } from '@ngrx/store';

export const ENTITY_FEATURE_KEY = "entity";

export interface EmployeeState {
  empId : string
    first_name : string
    last_name : string
    emailID : string
    mobile : number
    address : string
    Active : boolean
    projectId ?: string
}

const initialState: any = [];
//  {
//     empId: '',
//     first_name: '',
//     last_name : '',
//     emailID : '',
//     mobile : '',
//     address :"",
//     Active:true
// }

// export function empReducer(state: Employee[] = [initialState], action: Action) {
//     const tutorialAction = action as DemoActions.Actions;

//     switch(tutorialAction.type) {
//         case DemoActions.ADD_EMP:
//             return [...state, tutorialAction.payload];
//         case DemoActions.UPDATE_EMP:
//             state.splice(tutorialAction.payload, 1);
//             return state;
//         // case DemoActions.ADD_PROJECT:
//         //     return [...state, tutorialAction.payload];
//         default:
//             return state;
//     }
// export const empReducer = createReducer(
//   initialState,
//   on(SaveActionSuccess, (state, {data}) => [...data]
//   ));
export function empReducer(state = initialState, action:Action) {
  const tutorialAction = action as EmpAction;
  // console.log("reducer : ", tutorialAction, state, action);
  // console.log("save into store : ", tutorialAction.payload);

  switch (action.type) {

    case ActionTypes.SAVE:
      console.log("inside", state, tutorialAction.payload);
      return [...state, ...tutorialAction.payload];
    case ActionTypes.CREATE:
        console.log("tutorialAction.payload : ", tutorialAction.payload, state);
        alert("Record has been saved in Store", )
        return [...state, tutorialAction.payload];
    case ActionTypes.GET:
      console.log("get inside", state, tutorialAction.payload);
      // this.store.select(state => state).subscribe(state => console.log("dddd",{ state }));
      return [...state];
    default:
        return state;
    }
    
}