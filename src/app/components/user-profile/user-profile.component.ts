import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SharedService } from '../../services/shared.service';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user = {
    name: '',
    surname: '',
    phone: '',
    roles: [
    ]
  };

  isTester = false;
  isDev = false;

  constructor(private userService: UserService, private sharedService: SharedService, private conversationService: ConversationService) { }

  ngOnInit() {
    const userId = this.sharedService.userId;
    this.userService.getUser(userId).subscribe(data => {
      this.user.name = data.name;
      this.user.surname = data.surname;
      this.user.phone = data.phone;
      data.roles.forEach(role => {
        this.user.roles.push({ 'roleName': role.roleName });
      });
      if (this.user.roles.find(role => role.roleName === 'DEVELOPER')) {
        this.isDev = true;
      }
      if (this.user.roles.find(role => role.roleName === 'TESTER')) {
        this.isTester = true;
      }
      this.sharedService.userEmail = data.account.email;
    });
    this.conversationService.getListOfConversation().subscribe(list => {
      this.conversationService.allConversations = list;
    });
  }

  addRoleOfDev() {
    if (this.isDev) {
      this.user.roles.push({ roleName: 'DEVELOPER' });
    } else {
      this.user.roles.splice(this.user.roles.findIndex(item => item.roleName === 'DEVELOPER'));
    }
  }

  addRoleOfTester() {
    if (this.isTester) {
      this.user.roles.push({ roleName: 'TESTER' });
    } else {
      this.user.roles.splice(this.user.roles.findIndex(item => item.roleName === 'TESTER'));
    }
  }

  editUser() {
    this.userService.editUser(this.user).subscribe(_ => {
    });
  }

}
