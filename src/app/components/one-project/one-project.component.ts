import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { SharedService } from '../../services/shared.service';

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

  constructor(private projectService: ProjectService, private sharedService: SharedService) { }

  ngOnInit() {
  }

  createProject() {
    this.projectService.createProject(this.newProject.value).subscribe(_ => {
      this.newProject = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
        ownerId: new FormControl(this.sharedService.userId),
      });
      this.projectService.getProjects().subscribe(projects => {
        this.projectService.projects = projects;
      });
    });
  }
}
