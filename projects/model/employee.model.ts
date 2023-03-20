export interface Employee {
    empId : string
    first_name : string
    last_name : string
    emailID : string
    mobile : string
    address : string
    Active : boolean
    projectId ?: string
}

export interface Project{
    projectId : string
    project_name : string
    description : string
}
    
