import { Employee, Project } from "../lib/model/employee.model";

export interface AppState {
    empStore: Employee[];
}

export interface ProjectState {
    projectStore: Project[];
}