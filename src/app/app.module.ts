import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainBoardsComponent } from './components/main-boards/main-boards.component';
import { BoardComponent } from './components/board/board.component';
import { TaskComponent } from './components/task/task.component';
import { MenuComponent } from './components/menu/menu.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { MessageComponent } from './components/message/message.component';
import { NewMessagesComponent } from './components/new-messages/new-messages.component';
import { MainComponent } from './components/main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { OneProjectComponent } from './components/one-project/one-project.component';
import { SearchPipe } from './pipes/search.pipe';



const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'user/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'newMessages', component: NewMessagesComponent, canActivate: [AuthGuard] },
  { path: 'conversations', component: ConversationComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'projectBoard/:id', component: MainBoardsComponent, canActivate: [AuthGuard] },
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainBoardsComponent,
    BoardComponent,
    TaskComponent,
    MenuComponent,
    ConversationComponent,
    MessageComponent,
    MainComponent,
    PageNotFoundComponent,
    LoginComponent,
    UserProfileComponent,
    RegistrationComponent,
    NewMessagesComponent,
    ProjectsComponent,
    OneProjectComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
