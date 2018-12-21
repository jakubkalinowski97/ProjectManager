import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'app-new-messages',
  templateUrl: './new-messages.component.html',
  styleUrls: ['./new-messages.component.css']
})
export class NewMessagesComponent implements OnInit, OnDestroy {
  unreadMessages = null;
  constructor(private conversationService: ConversationService) { }

  ngOnInit() {
    this.conversationService.getUnreadMessages().subscribe( res => {
      console.log(res);
      this.unreadMessages = res;
    });
  }

  ngOnDestroy(): void {
    this.unreadMessages.forEach(msg => {
      this.conversationService.readMessage(msg).subscribe(_ => {});
    });
  }

}
