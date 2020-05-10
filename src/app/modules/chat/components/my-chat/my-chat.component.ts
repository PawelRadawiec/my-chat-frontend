import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Select} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {ChatContentState} from '../../../../store/chat-content/chat-content.state';
import {AuthorizationState} from '../../../../store/authorization/authorization.state';
import {ChatContent} from '../../model/chat-content.model';
import {SystemUser} from '../../../authentication-module/model/system-user.model';
import {ChatMessage} from '../../model/chat-message.model';

@Component({
  selector: 'app-my-chat',
  templateUrl: './my-chat.component.html',
  styleUrls: ['./my-chat.component.css']
})
export class MyChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scroll') private scrollContainer: ElementRef;
  @Select(ChatContentState.getChatContent) chatContent$: Observable<ChatContent>;
  @Select(AuthorizationState.getLoggedUser) loggedUser$: Observable<SystemUser>;

  private subscriptions: Subscription[] = [];
  chatContent: ChatContent = new ChatContent();
  messageForm: FormGroup;
  loggedUser: SystemUser;
  username: string;
  correspondentName: string;
  scrollBottom = false;
  stompClient: any;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForms();
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
          this.correspondentName = content.correspondent.username;
        }
      })
    );
    this.initWebSocketConnection();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  initWebSocketConnection() {
    const ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, () => {
      that.subscribeUserMessage();
    });
  }

  subscribeUserMessage() {
    const topic = `/topic/message.${this.username}.${this.correspondentName}`;
    this.subscriptions.push(
      this.stompClient.subscribe(topic, (message) => {
        this.handleResult(message);
      })
    );
  }

  handleResult(message: { body: string; }) {
    if (message) {
      const messageResult = JSON.parse(message.body);
      this.chatContent.messages.push(messageResult);
      this.scrollBottom = false;
      this.setScrollTop();
    }
  }

  messageOwner(message: ChatMessage) {
    return message.from === this.username;
  }

  showToLabel(message: ChatMessage) {
    return message.to === this.username;
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
      this.messageForm.reset();
    }
  }

  onScroll() {
    const element = this.scrollContainer.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    this.scrollBottom = !(this.scrollBottom && atBottom);
  }

  scrollToBottom() {
    if (this.scrollBottom) {
      return;
    }
    this.setScrollTop();
  }

  setScrollTop() {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (error) {
      console.error('scrollToBottomError', error);
    }
  }

  initForms() {
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required]
    });
  }


}
