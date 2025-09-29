import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectModel } from '../../model/project.model';
import { Observable } from 'rxjs';
import { ADD_PROJECT, ADD_TASK, DELETE_BY_ID_PROJECT, DELETE_TASK, GET_ALL_PROJECT, GET_ALL_TASK, GET_ALL_TASK_BY_MANGER, GET_ALL_TASK_STATUS, GET_BY_ClIENT_ID_PROJECT, GET_BY_ID_PROJECT, GET_BY_ID_TASK, GET_BY_MANAGER_ID, GET_BY_STAFF_ID, GET_TASK_COUNT, UPDATE_ALL_PROJECT, UPDATE_STATUS_PROJECT, UPDATE_STATUS_TASK, UPDATE_TASK } from '../../constant/url';
import { Task } from '../../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectServices {

  constructor(private http:HttpClient) { }
  // Project
  addProject(project:ProjectModel):Observable<ProjectModel>{
    return this.http.post<ProjectModel>(ADD_PROJECT,project)
  }
  getProject():Observable<ProjectModel[]>{
    return this.http.get<ProjectModel[]>(GET_ALL_PROJECT);
  }

  getProjectById(id:string):Observable<ProjectModel>{
    return this.http.get<ProjectModel>(GET_BY_ID_PROJECT+id);
  }

  getProjectByClientId(id:string):Observable<ProjectModel[]>{
    return this.http.get<ProjectModel[]>(GET_BY_ClIENT_ID_PROJECT+id);
  }

  getProjectByMangerId():Observable<ProjectModel[]>{
    return this.http.get<ProjectModel[]>(GET_BY_MANAGER_ID);
  }
  getByStaff():Observable<ProjectModel[]>{
    return this.http.get<ProjectModel[]>(GET_BY_STAFF_ID);
  }
  updateProject(id:string,project:ProjectModel):Observable<ProjectModel>{
    return this.http.put<ProjectModel>(UPDATE_ALL_PROJECT+id,project);
  }
  updateProjectStatus(id:string,status:string):Observable<ProjectModel>{
    return this.http.put<ProjectModel>(UPDATE_STATUS_PROJECT+id,{'status':status});
  }
  deleteProject(id:string){
    return this.http.delete(DELETE_BY_ID_PROJECT+id);
  }

  // Task
  addTask(task:Task):Observable<Task>{
    return this.http.post<Task>(ADD_TASK,task);
  }
  getTask(projectId:string):Observable<Task[]>{
    return this.http.get<Task[]>(GET_ALL_TASK+projectId);
  }
  getTaskOfUser(projectId:string):Observable<Task[]>{
    return this.http.get<Task[]>(GET_ALL_TASK_STATUS+projectId);
  }
  getTaskById(taskId:string):Observable<Task>{
    return this.http.get<Task>(GET_BY_ID_TASK+taskId);
  }

  getAllTaskByManager():Observable<Task[]>{
    return this.http.get<Task[]>(GET_ALL_TASK_BY_MANGER);
  }
  getTaskCount():Observable<any>{
    return this.http.get<any>(GET_TASK_COUNT);
  }
  updateTaskStatus(taskId:string,status:string):Observable<Task>{
    return this.http.put<Task>(UPDATE_STATUS_TASK+taskId,{'status':status});
  }
  updateTask(taskId:string,task:Task):Observable<Task>{
    return this.http.put<Task>(UPDATE_TASK+taskId,task);
  }
  deleteTask(id:string):Observable<Task>{
    return this.http.delete<Task>(DELETE_TASK+id);
  }

}
