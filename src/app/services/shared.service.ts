import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  userId: string;
  userEmail: string;
  currentConversationId = null;
  currentReceiverEmail = null;
  currentGroupId = null;
  currentProjectId = null;
  currentTableId = null;
  constructor() { }
}
