import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { ConversationService } from '../../services/conversation.service';
import { format } from 'url';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '300px',
        opacity: '1'
      })),
      state('close', style({
        height: '0px',
        opacity: '0'
      })),
      transition('open => close', [
        animate('0.2s')
      ]),
      transition('close => open', [
        animate('0.2s')
      ]),
    ])
  ]
})
export class ConversationComponent implements OnInit {
  toggleNewConv = false;
  newMessage = {
    'body': '',
    'senderEmail': this.sharedService.userEmail,
    'recipientEmail': this.sharedService.currentReceiverEmail,
    'conversationId': this.sharedService.currentConversationId,
    'isRead': false
  };

  newConversation = {
    'title': '',
  };

  newConvMessage = {
    'body': '',
    'senderEmail': this.sharedService.userEmail,
    'recipientEmail': this.sharedService.currentReceiverEmail,
    'conversationId': '',
    'isRead': false
  };

  currentConv = null;

  constructor(private userService: UserService, private sharedService: SharedService, private route: Router,
    private conversationService: ConversationService) { }

  ngOnInit() {
    this.getConversations();
  }

  selectConversation(convId) {
    this.sharedService.currentConversationId = convId;
    this.newMessage.conversationId = convId;
    this.currentConv = this.conversationService.conversationsWithMessages.find(el => el.id === convId);
    this.getReceiverEmail(convId);
    this.newMessage.recipientEmail = this.sharedService.currentReceiverEmail;
  }

  sendMessage(newConv: boolean) {
    if (newConv) {
      this.conversationService.sendMessage(this.newConvMessage).subscribe(_ => {
        this.getConversations();
      });
      this.newConvMessage.body = '';
      this.newConvMessage.recipientEmail = '';
      this.newConversation.title = '';
    } else {
      this.conversationService.sendMessage(this.newMessage).subscribe(_ => {
        this.getConversations();
      });
      this.newMessage.body = '';
    }
  }

  getConversations() {
    this.conversationService.getListOfConversation().subscribe(list => {
      this.conversationService.allConversations = list;
      this.conversationService.conversationsWithMessages = [];
      this.conversationService.allConversations.forEach(conv => {
        this.conversationService.getConversationsWithMessages(conv.id).subscribe(convWithMsg => {
          this.conversationService.conversationsWithMessages.push(convWithMsg);
        });
      });
      if (this.conversationService.allConversations.length === 0) {
        this.toggleNewConv = true;
      }
    });
  }

  createConversation() {
    this.conversationService.createConversation(this.newConversation).subscribe( conv => {
      this.newConvMessage.conversationId = conv.id;
      this.sendMessage(true);
    });
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = ('0' + date.getMonth() + 1).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const formatedDate = year + '-' + month + '-' + day + '-' + hours + '-' + minutes + '-' + seconds;
    return formatedDate;
  }

  toggleNewConversation() {
    this.toggleNewConv = !this.toggleNewConv;
  }

  getReceiverEmail(convId) {
    this.currentConv.messages.forEach(element => {
      if (element.senderEmail !== this.sharedService.userEmail) {
        this.sharedService.currentReceiverEmail = element.senderEmail;
      } else {
        this.sharedService.currentReceiverEmail = element.recipientEmail;
      }
      return;
    });
  }

  sortConversationsUp() {
    console.log('sortowanoie');
    console.log(this.conversationService.allConversations.sort((a, b) => {
      if (a.creationDate > b.creationDate) {
      return 1;
      } else if (b.creationDate > a.creationDate) {
      return -1;
      } else { return 0; }
    })
    );
  }

  sortConversationsDown() {
    console.log('sortowanoie');
    console.log(this.conversationService.allConversations.sort((a, b) => {
      if (a.creationDate > b.creationDate) {
      return -1;
      } else if (b.creationDate > a.creationDate) {
      return 1;
      } else { return 0; }
    })
    );
  }
}
