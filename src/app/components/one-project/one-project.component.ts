import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-one-project',
  templateUrl: './one-project.component.html',
  styleUrls: ['./one-project.component.css']
})
export class OneProjectComponent implements OnInit {

  @Input() project;
  @Input() tileToCreateProject;

  newProject = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    ownerId: new FormControl(this.sharedService.userId),
  });

  newGroup = {
    name: null
  };

  tableConnectedProjectGroup = {
    name: 'connected',
    groupId: null,
    projectId: null
  };

  constructor(private projectService: ProjectService, private sharedService: SharedService, private route: Router) { }

  ngOnInit() {
  }

  createProject() {
    this.projectService.createProject(this.newProject.value).subscribe(project => {
      this.sharedService.currentProjectId = project.id;
      this.newGroup.name = project.name;
      this.createGroup();
        this.newProject = new FormGroup({
          name: new FormControl(''),
          description: new FormControl(''),
          ownerId: new FormControl(this.sharedService.userId),
        });
    });
  }

  createGroup() {
    this.projectService.createGroup(this.newGroup).subscribe(group => {
      this.sharedService.currentGroupId = group.id;
      this.tableConnectedProjectGroup.groupId = group.id;
      this.tableConnectedProjectGroup.projectId = this.sharedService.currentProjectId;
      this.createTable();
      this.newGroup.name = null;
    });
  }

  createTable() {
    this.projectService.createTable(this.tableConnectedProjectGroup).subscribe(table => {
      this.sharedService.currentTableId = table.id;
      this.addUserToGroup(this.sharedService.currentGroupId, this.sharedService.userEmail);
    });
  }

  addUserToGroup(groupId, userEmail) {
    this.projectService.addUserToGroup(groupId, userEmail).subscribe(_ => {
      this.projectService.getProjects().subscribe(projects => {
        this.projectService.projects.next(projects);
        console.log(projects);
        console.log(this.projectService.projects.getValue());
      });
    });
  }

  deleteProject() {
    this.projectService.deleteProject(this.project).subscribe(_ => {
      this.projectService.getProjects().subscribe(projects => {
        console.log(projects);
        this.projectService.projects.next(projects);
      });
    });
  }

  selectProject() {
    this.projectService.selectedProject = this.project;
    this.sharedService.currentProjectId = this.project.id;
    this.route.navigateByUrl('/projectBoard/id');
  }
}
