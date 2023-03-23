import { createFeatureSelector, createSelector } from '@ngrx/store';
import {EmployeeState} from '../reducers/emp.reducer';
import {Employee} from '../model/employee.model';

export const EMP_STATE_NAME = 'employeeList';


// export const empSelector = createSelector(
//   (state: EmployeeState) => state.empList,
//   (employees: Array<Employee>) => employees
// );