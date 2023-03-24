import { Action } from "@ngrx/store";
import { Employee } from "../model/employee.model";
import { ProjectAction, ActionTypes} from '../actions/project.actions';
import { createReducer, on } from '@ngrx/store';

export const ENTITY_FEATURE_KEY = "entity";

export interface ProjectState {
    projectId : string
    project_name : string
    description : string
    isLoading ?: boolean
}

const initialState: any = [];

export function projectReducer(state = initialState, action:Action) {
  const projectAction = action as ProjectAction;
  console.log("projectAction.payload : ", action.type)
  switch (action.type) {
   
    case ActionTypes.CREATE:
        console.log("inside: ", state, projectAction.payload);
        alert("Record has been saved in Store", )
        return [...state, projectAction.payload];
    case ActionTypes.GET:
    //   console.log("get inside", state, projectAction.payload);
      // this.store.select(state => state).subscribe(state => console.log("dddd",{ state }));
      return [...state];
    default:
        return state;
    }
    
}
