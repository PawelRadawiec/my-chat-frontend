import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Select} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {ChatContentState} from 'src/app/store/chat-content/chat-content.state';
import {AuthorizationState} from '../../store/authorization/authorization.state';
import {ChatMessage} from '../../model/chat-message.model';
import {ChatContent} from 'src/app/model/chat-content.model';
import {SystemUser} from '../../model/system-user.model';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-my-chat',
  templateUrl: './my-chat.component.html',
  styleUrls: ['./my-chat.component.css']
})
export class MyChatComponent implements OnInit {
  @Select(ChatContentState.getChatContent) chatContent$: Observable<ChatContent>;
  @Select(AuthorizationState.getLoggedUser) loggedUser$: Observable<SystemUser>;

  subscriptions: Subscription[] = [];
  chatContent: ChatContent = new ChatContent();
  messageForm: FormGroup;
  loggedUser: SystemUser;
  username: string;
  correspondentName: string;
  stompClient: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.initForms();
    this.correspondentName = this.route.snapshot.paramMap.get('username');
    this.subscriptions.push(
      this.loggedUser$.subscribe((user) => {
        if (user) {
          this.loggedUser = user;
          this.username = user.username;
        }
      }),
      this.chatContent$.subscribe(content => {
          if (content) {
            this.chatContent = content;
          }
        }
      )
    );
    this.initWebSocketConnection();
  }

  initWebSocketConnection() {
    const ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, () => {
      that.openGlobalSocket();
      that.openSocket();
    });
  }

  openGlobalSocket() {
    const topic = `/topic/message.${this.username}.${this.correspondentName}`;
    this.stompClient.subscribe(topic, (message) => {
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
      this.chatContent.messages.push(messageResult);
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
      to: this.correspondentName,
      message: null,
    };
    this.stompClient.send('/app/add/user', {}, JSON.stringify(chatMessage));
  }

  sendMessage() {
    if (this.messageForm.valid) {
      const message: ChatMessage = {
        from: this.username,
        to: this.correspondentName,
        message: this.messageForm.value.message,
        content: this.chatContent
      };
      this.stompClient.send('/app/send.message', {}, JSON.stringify(message));
    }
  }

  initForms() {
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required]
    });
  }


}
