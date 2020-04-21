import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatMessage } from '../../model/chat-message.model';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ActivatedRoute } from '@angular/router';
import { ChatContent } from 'src/app/model/chat-content.model';
import { ChatContentState } from 'src/app/store/chat-content/chat-content.state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ChatContentSaveReceivedMessage } from '../../store/chat-content/chat-content.actions';
import {SystemUser} from '../../model/system-user.model';

@Component({
  selector: 'app-my-chat',
  templateUrl: './my-chat.component.html',
  styleUrls: ['./my-chat.component.css']
})
export class MyChatComponent implements OnInit {
  @Select(ChatContentState.getChatContent) chatContent$: Observable<ChatContent>;

  chatContent: ChatContent = new ChatContent();
  messageForm: FormGroup;
  userForm: FormGroup;
  username: string;
  stompClient: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.initForms();
    this.username = this.route.snapshot.paramMap.get('username');
    this.initWebSocketConnection();
    this.chatContent$.subscribe(content => {
      if (content) {
        this.chatContent = content;
      }
    }
    );
  }

  initWebSocketConnection() {
    const ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, () => {
      const systemUser: SystemUser = {
        id: 1,
        username: that.username
      };
      that.stompClient.send('/app/send/user', {}, JSON.stringify(systemUser));
      that.openGlobalSocket();
      that.openSocket();
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe('/topic/message', (message) => {
      this.handleResult(message);
    });
  }

  openSocket() {
    this.stompClient.subscribe('/topic/' + this.username, (message) => {
      this.handleResult(message);
      this.activeSocket();
    });
  }

  handleResult(message: { body: string; }) {
    if (message) {
      const messageResult = JSON.parse(message.body);
      this.chatContent.messages.push(messageResult.body);
      const chatMessage: ChatMessage = {
        message: messageResult.body.message,
        from: messageResult.body.from,
        to: messageResult.body.to,
        content: this.chatContent
      };
      if (messageResult.body.from !== this.username) {
        console.log('chatMessage: ', chatMessage);
        this.store.dispatch(new ChatContentSaveReceivedMessage(chatMessage));
      }
    }
  }

  messageOwner(message: ChatMessage) {
    return message.from === this.username;
  }

  showToLabel(message: ChatMessage) {
    return message.to === this.username;
  }

  activeSocket() {
    const chatMessage: ChatMessage = {
      from: this.username,
      to: this.userForm.value.to,
      message: null,
    };
    this.stompClient.send('/app/add/user', {}, JSON.stringify(chatMessage));
  }

  sendMessage() {
    if (this.messageForm.valid) {
      const message: ChatMessage = {
        from: this.username,
        to: this.userForm.value.to,
        message: this.messageForm.value.message,
        content: this.chatContent
      };
      this.stompClient.send('/app/send/message', {}, JSON.stringify(message));
    }
  }

  initForms() {
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required]
    });
    this.userForm = this.formBuilder.group(({
      username: ['', Validators.required],
      from: ['', Validators.required],
      to: ['']
    }));
  }


}
