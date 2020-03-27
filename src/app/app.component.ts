import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChatMessage} from './model/chat-message.model';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messageForm: FormGroup;
  userForm: FormGroup;
  messages: ChatMessage[] = [];
  stompClient;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.initForms();
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
    this.stompClient.connect({}, function () {
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe('/topic', (message) => {
      this.handleResult(message);
    });
  }

  handleResult(message) {
    if (message) {
      const messageResult: ChatMessage = JSON.parse(message.body);
      this.messages.push(messageResult);
    }
  }

  sendMessage() {
    if (this.messageForm.valid) {
      const message: ChatMessage = {
        message: this.messageForm.value.message,
        from: this.userForm.value.from,
        to: this.userForm.value.to
      };
      this.stompClient.send('/app/send/message', {}, JSON.stringify(message));
    }
  }

  activeSocket() {
    this.stompClient.subscribe('/topic/' + this.userForm.value.from, (message) => {
      this.handleResult(message);
    });
    const chatMessage: ChatMessage = {
      from: this.userForm.value.from,
      message: null,
      to: null
    };
    this.stompClient.send('/app/add/user', {}, JSON.stringify(chatMessage));
  }


}
