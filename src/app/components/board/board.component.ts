import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() table;
  @Input() tileToCreateTable;

  newTable = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private projectService: ProjectService, private sharedService: SharedService) { }

  ngOnInit() {
  }

  createTable() {
    this.projectService.createTable(this.newTable.value).subscribe(_ => {
      this.newTable = new FormGroup({
        name: new FormControl(''),
      });
      this.projectService.getTables().subscribe(projects => {
        this.projectService.projects.next(projects);
      });
    });
  }
}
