import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.allProjects.subscribe( projects => this.projects = projects );
    this.projectService.getProjects().subscribe(projects => {
      this.projectService.projects.next(projects);
    });
  }
}
