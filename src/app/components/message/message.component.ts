import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message;
  senderEmail;
  constructor(private userService: UserService, private sharedService: SharedService, private route: Router) { }

  ngOnInit() {
    this.getSenderEmail();
  }

  getSenderEmail() {
    this.userService.getUser(this.message.senderId).subscribe( user => {
      this.senderEmail = user.account.email;
    });
  }

}
