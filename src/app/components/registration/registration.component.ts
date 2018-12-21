import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Output() closeRegistration = new EventEmitter();

  newUser = {
    name: '',
    surname: '',
    phone: '',
    account: {
      password: '',
      email: '',
      isActive: true
    },
    roles: [
    ]
  };

  isTester = false;
  isDev = false;

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit() {
  }

  register() {
    this.userService.register(this.newUser).subscribe(_ => {
      this.route.navigate(['/login']);
    });
  }

  addRoleOfDev() {
    if (this.isDev) {
      this.newUser.roles.push({roleName: 'DEVELOPER'});
    } else {
      this.newUser.roles.splice(this.newUser.roles.findIndex(item => item.roleName === 'DEVELOPER'));
    }
  }

  addRoleOfTester() {
    if (this.isTester) {
      this.newUser.roles.push({roleName: 'TESTER'});
    } else {
      this.newUser.roles.splice(this.newUser.roles.findIndex(item => item.roleName === 'TESTER'));
    }
  }
}
