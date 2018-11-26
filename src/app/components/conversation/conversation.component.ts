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
        height: '200px',
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
    'postDate': this.formatDate(new Date()),
    'senderId': this.sharedService.userId,
    'recipientEmail': this.sharedService.currentReceiverEmail,
    'conversationId': this.sharedService.currentConversationId,
    'read': false
  };

  newConversation = {
    'title': '',
    'creationDate': ''
  };

  newConvMessage = {
    'body': '',
    'postDate': '',
    'senderId': this.sharedService.userId,
    'recipientEmail': '',
    'conversationId': '',
    'read': false
  };

  currentConv = null;
  currentReceiverEmail = null;

  constructor(private userService: UserService, private sharedService: SharedService, private route: Router,
    private conversationService: ConversationService) { }

  ngOnInit() {
    // getConversations => this.conversationService.conversations = nowe konwersacje
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
      this.newConvMessage.postDate = this.formatDate(new Date());
      this.conversationService.sendMessage(this.newConvMessage).subscribe(_ => {
        this.getConversations();
      });
      this.newConvMessage.body = '';
      this.newConvMessage.recipientEmail = '';
      this.newConversation.title = '';
    } else {
      this.newMessage.postDate = this.formatDate(new Date());
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
    console.log(('0' + date.getSeconds()).slice(-2));
    const formatedDate = year + '-' + month + '-' + day + '-' + hours + '-' + minutes + '-' + seconds;
    return formatedDate;
  }

  toggleNewConversation() {
    this.toggleNewConv = !this.toggleNewConv;
  }

  getReceiverEmail(convId) {
    const tmpConv = this.conversationService.conversationsWithMessages.find(el => el.id === convId);
    let message = tmpConv.messages.find(msg => {
      return msg.recipientEmail !== this.sharedService.userEmail;
    });
    if (message) {
      this.sharedService.currentReceiverEmail = message.recipientEmail;
    } else {
      message = tmpConv.messages.find(msg => {
        return msg.senderId !== this.sharedService.userId;
      });
      this.getEmailByUserId(message.senderId);
    }
  }

  getEmailByUserId(userId) {
    this.userService.getUser(userId).subscribe(res => {
      this.sharedService.currentReceiverEmail = res.account.email;
    });
  }
}
