import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-main-boards',
  templateUrl: './main-boards.component.html',
  styleUrls: ['./main-boards.component.css']
})
export class MainBoardsComponent implements OnInit {

  project;
  searchText = '';

  constructor(private projectService: ProjectService, private sharedService: SharedService) { }

  ngOnInit() {
    this.project = this.projectService.selectedProject;
    this.projectService.resetTasks();
    this.projectService.getProjectWithTasks(this.project).subscribe( res => {
      this.projectService.tasks = res.tasks;
      this.projectService.divideTasks();
    });
    this.projectService.getCurrentGroup(this.project).subscribe(group => {
      console.log(group);
      this.projectService.selectedGroup = group[0];
    });
  }





}
