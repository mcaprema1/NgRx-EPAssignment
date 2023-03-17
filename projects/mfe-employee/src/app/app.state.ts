import { Employee } from "../../../model/employee.model";

export interface AppState {
    readonly empStore: Employee[];
}