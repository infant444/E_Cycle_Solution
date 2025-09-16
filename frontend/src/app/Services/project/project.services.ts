import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectModel } from '../../model/project.model';
import { Observable } from 'rxjs';
import { ADD_PROJECT, DELETE_BY_ID_PROJECT, GET_ALL_PROJECT, UPDATE_ALL_PROJECT } from '../../constant/url';

@Injectable({
  providedIn: 'root'
})
export class ProjectServices {

  constructor(private http:HttpClient) { }

  addProject(project:ProjectModel):Observable<ProjectModel>{
    return this.http.post<ProjectModel>(ADD_PROJECT,project)
  }
  getProject():Observable<ProjectModel[]>{
    return this.http.get<ProjectModel[]>(GET_ALL_PROJECT);
  }
  updateProject(id:string,project:ProjectModel):Observable<ProjectModel>{
    return this.http.put<ProjectModel>(UPDATE_ALL_PROJECT+id,project);
  }
  deleteProject(id:string){
    return this.http.delete(DELETE_BY_ID_PROJECT+id);
  }
}
