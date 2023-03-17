import { Action } from "@ngrx/store";
import { Employee } from "../../../../model/employee.model";
import * as DemoActions from '../actions/emp.actions';

const initialState: Employee = {
    // empId: '11025',
    // first_name: 'Prema',
    // last_name : 'Palanisamy',
    // emailID : 'prema.palanisamy@gmail.com',
    // mobile : '8610851868',
    // address :"OMR"
    empId: '',
    first_name: '',
    last_name : '',
    emailID : '',
    mobile : '',
    address :"",
    Active:true
}

export function empReducer(state: Employee[] = [initialState], action: Action) {
    const tutorialAction = action as DemoActions.Actions; 
    
    switch(tutorialAction.type) {
        case DemoActions.ADD_EMP:
            return [...state, tutorialAction.payload];
        case DemoActions.UPDATE_EMP:
            state.splice(tutorialAction.payload, 1);
            return state;
        // case DemoActions.ADD_PROJECT:
        //     return [...state, tutorialAction.payload];
        default:
            return state;
    }
}   