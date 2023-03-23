import { createFeatureSelector, createSelector } from '@ngrx/store';
import {EmployeeState, ENTITY_FEATURE_KEY} from '../reducers/emp.reducer';
import {Employee} from '../model/employee.model';
import { AppState} from '../lib-store.util'

export const EMP_STATE_NAME = 'employeeList';


// export const empSelector = createSelector(
//   (state: EmployeeState) => state.empList,
//   (employees: Array<Employee>) => employees
// );
const getEntityState = createFeatureSelector<EmployeeState>(ENTITY_FEATURE_KEY);
export const selectEmployees = (state: AppState) => state.empStore;