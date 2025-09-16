export class ProjectModel{
  id!:string;
  project_name!:string;
  description!:string;
  manager_id!:string;
  client_id!:string;
  due_date!:string;
  status!:string;
  priority!:number;
  budget!:number;
  team_member?:string[];
  tags?:string[];
  level_complete!:number;
  no_task!:number;
  completed_task!:number;
}
