import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../services/auth-guard.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private auth: AuthGuardService) { }

  ngOnInit() {
  }


}
