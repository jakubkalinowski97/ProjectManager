import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() createNewTask;
  @Input() task;

  newTask = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    userEmail: new FormControl(''),
    priority: new FormControl(''),
    projectId: new FormControl(this.sharedService.currentProjectId),
    isDone: new FormControl(false)
  });

  newUser = '';


  constructor(private sharedService: SharedService, private projectService: ProjectService) { }

  ngOnInit() {
  }

  createTask() {
    this.projectService.createTask(this.newTask.value).subscribe(_ => {
      this.projectService.getProjectWithTasks(this.projectService.selectedProject).subscribe(project => {
        this.projectService.tasks = project.tasks;
        this.projectService.divideTasks();
      });
    });
  }

  toggleTask() {
    if (!this.task.isDone) {
      const isDone = {
        'isDone': true
      };
      this.projectService.toggleIsDone(this.task.id, isDone).subscribe(_ => {
        this.projectService.getProjectWithTasks(this.projectService.selectedProject).subscribe(res => {
          this.projectService.tasks = res.tasks;
          this.projectService.divideTasks();
        });
      });
    } else {
      const isDone = {
        'isDone': false
      };
      this.projectService.toggleIsDone(this.task.id, isDone).subscribe(_ => {
        this.projectService.getProjectWithTasks(this.projectService.selectedProject).subscribe(res => {
          this.projectService.tasks = res.tasks;
          this.projectService.divideTasks();
        });
      });
    }

  }

  deleteTask() {
    this.projectService.deleteTask(this.task).subscribe(_ => {
      this.projectService.getProjectWithTasks(this.projectService.selectedProject).subscribe(res => {
        this.projectService.tasks = res.tasks;
        this.projectService.divideTasks();
      });
    });
  }

  addNewUser() {
    this.projectService.addUserToGroup(this.projectService.selectedGroup.id, this.newUser).subscribe(res => {
      console.log(res);
      this.newUser = '';
    });
  }
}
