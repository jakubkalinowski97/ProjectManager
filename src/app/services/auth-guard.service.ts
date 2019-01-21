import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';
import { ConversationService } from './conversation.service';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private sharedService: SharedService,
    private conversationService: ConversationService,
    private projectService: ProjectService,
    private router: Router
    ) { }

  canActivate(): boolean {
    if (!this.sharedService.userId) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  logout() {
    this.sharedService.userId = '';
    this.sharedService.userEmail = '';
    this.sharedService.currentConversationId = '';
    this.sharedService.currentReceiverEmail = '';
    this.conversationService.allConversations = [];
    this.conversationService.conversationsWithMessages = [];
    this.projectService.projects.next([]);
  }
}
