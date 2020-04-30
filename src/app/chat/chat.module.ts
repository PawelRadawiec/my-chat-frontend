import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyChatComponent} from './components/my-chat/my-chat.component';
import {NavComponent} from './components/nav/nav.component';
import {ReactiveFormsModule} from '@angular/forms';
import {routing} from './chat.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    MyChatComponent,
    NavComponent
  ],
  exports: [
    MyChatComponent,
    NavComponent
  ]
})
export class ChatModule { }
