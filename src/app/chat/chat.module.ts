import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyChatComponent} from './components/my-chat/my-chat.component';
import {NavComponent} from './components/nav/nav.component';
import {ReactiveFormsModule} from '@angular/forms';
import {routing} from './chat.routing';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    MyChatComponent,
    NavComponent,
    UserListComponent
  ],
  exports: [
    MyChatComponent,
    NavComponent
  ]
})
export class ChatModule { }
