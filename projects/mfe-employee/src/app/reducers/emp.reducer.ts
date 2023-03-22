import { Action } from "@ngrx/store";
import { Employee } from "../../../../model/employee.model";
import {EmpAction, ActionTypes} from '../actions/emp.actions';
import { createReducer, on } from '@ngrx/store';

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
  console.log("reducer : ", tutorialAction, state, action);
  console.log("save into store : ", tutorialAction.payload);

  switch (action.type) {

    case ActionTypes.SAVE:
      console.log("insude");

      // return Object.assign({}, state, {
      //   error: null,
      //   tasks: [...state.tasks, tutorialAction.payload.task]
      // });
      return [...state, ...tutorialAction.payload];
      default:
        return state;
    }
}
