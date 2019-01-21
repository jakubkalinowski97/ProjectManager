import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  prefix = 'http://localhost:8080';
  createProjectUrl = this.prefix + '/projects';
  getProjectsUrl = this.prefix + '/users/withProjectsHeParticipates/{userId}';
  deleteProjectUrl = this.prefix + '/projects/{projectId}';
  getProjectWithTasksUrl = this.prefix + '/projects/withTasks/{projectId}';
  getOwnedProjectsUrl = this.prefix + '/users/withManagedProjects/{userId}';

  createTableUrl = this.prefix + '/tables';
  editTableUrl = this.prefix + '/tables/{tableId}';
  deleteTableUrl = this.prefix + '/tables/{tableId}';

  createGroupUrl = this.prefix + '/groups';
  addUserToGroupUrl = this.prefix + '/groups/{groupId}';
  getCurrentGroupUrl = this.prefix + '/projects/groups/{projectId}';

  createTaskUrl = this.prefix + '/tasks';
  deleteTaskUrl = this.prefix + '/tasks/{taskId}';
  toggleTaskIsDoneUrl = this.prefix + '/tasks/{taskId}';


  projects: BehaviorSubject<any[]> = new BehaviorSubject([]);
  tasks = [];
  highTasks = [];
  mediumTasks = [];
  lowTasks = [];
  doneTasks = [];
  selectedProject;
  selectedGroup;

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  get allProjects() {
    return this.projects.asObservable();
  }

  getTables(): Observable<any> {
    return this.http.get(this.createTableUrl, this.httpOptions);
  }
  createTable(table): Observable<any> {
    return this.http.post(this.createTableUrl, JSON.stringify(table), this.httpOptions);
  }

  editTable(table): Observable<any> {
    const url = this.editTableUrl.replace('{tableId}', table.id);
    return this.http.patch(url, JSON.stringify(table), this.httpOptions);
  }

  deleteTable(table): Observable<any> {
    const url = this.deleteTableUrl.replace('{tableId}', table.id);
    return this.http.delete(url, this.httpOptions);
  }

  createProject(project): Observable<any> {
    return this.http.post(this.createProjectUrl, JSON.stringify(project), this.httpOptions);
  }

  deleteProject(project): Observable<any> {
    const url = this.deleteProjectUrl.replace('{projectId}', project.id);
    return this.http.delete(url);
  }

  getProjects(): Observable<any> {
    const url = this.getProjectsUrl.replace('{userId}', this.sharedService.userId);
    return this.http.get(url);
  }

  getProjectWithTasks(project): Observable<any> {
    const url = this.getProjectWithTasksUrl.replace('{projectId}', project.id);
    return this.http.get(url);
  }

  getOwnedProjects(): Observable<any> {
    const url = this.getOwnedProjectsUrl.replace('{userId}', this.sharedService.userId);
    return this.http.get(url);
  }

  createGroup(group): Observable<any> {
    return this.http.post(this.createGroupUrl, JSON.stringify(group), this.httpOptions);
  }

  addUserToGroup(groupId, userEmail): Observable<any> {
    const url = this.addUserToGroupUrl.replace('{groupId}', groupId);
    const email = {
      'userEmail': userEmail
    };
    return this.http.patch(url, email, this.httpOptions);
  }

  toggleIsDone(taskId, isDone): Observable<any> {
    const url = this.toggleTaskIsDoneUrl.replace('{taskId}', taskId);
    return this.http.patch(url, JSON.stringify(isDone), this.httpOptions);
  }

  deleteTask(task): Observable<any> {
    const url = this.deleteTaskUrl.replace('{taskId}', task.id);
    return this.http.delete(url, this.httpOptions);
  }
  createTask(task): Observable<any> {
    return this.http.post(this.createTaskUrl, JSON.stringify(task), this.httpOptions);
  }

  resetTasks() {
    this.highTasks = [];
    this.mediumTasks = [];
    this.lowTasks = [];
    this.doneTasks = [];
  }

  divideTasks() {
    this.resetTasks();
    Object.keys(this.tasks).forEach(key => {
      if (this.tasks[key].priority === 'HIGH' && this.tasks[key].isDone === false) {
        this.highTasks.push(this.tasks[key]);
      } else if (this.tasks[key].priority === 'MEDIUM' && this.tasks[key].isDone === false) {
        this.mediumTasks.push(this.tasks[key]);
      } else if (this.tasks[key].priority === 'LOW' && this.tasks[key].isDone === false) {
        this.lowTasks.push(this.tasks[key]);
      } else if (this.tasks[key].isDone === true) {
        this.doneTasks.push(this.tasks[key]);
      }
    });
  }

  getCurrentGroup(project) {
    const url = this.getCurrentGroupUrl.replace('{projectId}', project.id);
    return this.http.get(url, this.httpOptions);
  }
}
