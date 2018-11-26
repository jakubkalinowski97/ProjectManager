import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: string;
  password: string;
  isRegistrationOpen = false;
  constructor(private userService: UserService, private sharedService: SharedService, private route: Router) { }

  ngOnInit() {
  }

  login(username, password) {
    this.userService.login(username, password).subscribe( userId => {
      this.sharedService.userId = userId;
      this.route.navigate(['/user/id']);
    });
  }

  openRegistration() {
    this.isRegistrationOpen = true;
  }

  closeRegistration() {
    this.isRegistrationOpen = false;
  }

}
