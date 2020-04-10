import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChatMessage} from '../../model/chat-message.model';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {ActivatedRoute} from '@angular/router';
import {SystemUser} from '../../components/nav/nav.component';

@Component({
  selector: 'app-my-chat',
  templateUrl: './my-chat.component.html',
  styleUrls: ['./my-chat.component.css']
})
export class MyChatComponent implements OnInit {
  messageForm: FormGroup;
  userForm: FormGroup;
  messages: ChatMessage[] = [];
  username: string;
  stompClient;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.initForms();
    this.username = this.route.snapshot.paramMap.get('username');
    this.initWebSocketConnection();
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

  initWebSocketConnection() {
    const ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({},  () => {
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

  handleResult(message) {
    if (message) {
      const messageResult: ChatMessage = JSON.parse(message.body);
      messageResult.isMessageOwner = (messageResult.from === this.username);
      this.messages.push(messageResult);
    }
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
        message: this.messageForm.value.message
      };
      this.stompClient.send('/app/send/message', {}, JSON.stringify(message));
    }
  }


}
