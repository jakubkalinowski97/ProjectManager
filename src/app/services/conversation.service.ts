import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  allConversations = [];
  conversationsWithMessages = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  prefix = 'http://localhost:8080';
  sendMessageUrl = this.prefix + '/messages';
  createConversationUrl = this.prefix + '/conversations';
  unreadMessagesUrl = this.prefix + '/messages/byRead?recipientId={id}&read=false';
  checkReadMessagesUrl = this.prefix + '/messages/{id}';
  conversationsWithMessagesUrl = this.prefix + '/conversations/conversationWithSortedMessages/{convId}';
  conversationsUrl = this.prefix + '/conversations/sortedConversations/{userId}';
  constructor(private http: HttpClient, private sharedService: SharedService) { }

  sendMessage(message): Observable<any> {
    return this.http.post(this.sendMessageUrl, JSON.stringify(message), this.httpOptions);
  }

  createConversation(conv): Observable<any> {
    return this.http.post(this.createConversationUrl, JSON.stringify(conv), this.httpOptions);
  }

  getUnreadMessages(): Observable<any> {
    const url = this.unreadMessagesUrl.replace('{id}', this.sharedService.userId);
    return this.http.get(url);
  }

  readMessage(msg): Observable<any> {
    const isReadMsg = {
      isRead: 'true'
    };
    const url = this.checkReadMessagesUrl.replace('{id}', msg.id);
    return this.http.patch(url, JSON.stringify(isReadMsg), this.httpOptions);
  }

  getConversationsWithMessages(convId): Observable<any> {
    const url = this.conversationsWithMessagesUrl.replace('{convId}', convId);
    return this.http.get(url);
  }

  getListOfConversation(): Observable <any> {
    const url = this.conversationsUrl.replace('{userId}', this.sharedService.userId);
    return this.http.get(url);
  }
}
