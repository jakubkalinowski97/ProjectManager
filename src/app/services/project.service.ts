import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  prefix = 'http://localhost:8080';
  createProjectUrl = this.prefix + '/projects';
  getProjectsUrl = this.prefix + '/projects';
  deleteProjectUrl = this.prefix + '/projects/{projectId}';
  getProjectWithTasksUrl = this.prefix + 'projects/withTasks/{projectId}';
  getOwnedProjectsUrl = this.prefix + 'users/withManagedProjects/{userId}';


  projects = [];

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  createProject(project): Observable<any> {
    return this.http.post(this.createProjectUrl, JSON.stringify(project), this.httpOptions);
  }

  deleteProject(project): Observable<any> {
    const url = this.deleteProjectUrl.replace('{projectId}', project.id);
    return this.http.delete(url);
  }

  getProjects(): Observable<any> {
    return this.http.get(this.getProjectsUrl);
  }

  getProjectWithTasks(project): Observable<any> {
    const url = this.getProjectWithTasksUrl.replace('{projectId}', project.id);
    return this.http.get(url);
  }

  getOwnedProjects(): Observable<any> {
    const url = this.getOwnedProjectsUrl.replace('{userId}', this.sharedService.userId);
    return this.http.get(url);
  }
}
