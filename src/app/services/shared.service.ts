import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  userId: string;
  userEmail: string;
  currentConversationId = '';
  currentReceiverEmail = '';
  constructor() { }
}
