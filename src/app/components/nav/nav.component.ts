import { Component, OnInit } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {SystemUser} from '../../model/system-user.model';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  stompClient;
  systemUserList: SystemUser[] = [];

  constructor() {
  }

  ngOnInit() {
    this.initWebSocketConnection();
  }

  initWebSocketConnection() {
    const ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, () => {
      that.openSocket();
    });
  }

  openSocket() {
    this.stompClient.subscribe('/topic/users', (systemUser) => {
      this.handleResult(systemUser);
    });
  }

  handleResult(user) {
    if (user) {
      const systemUser: SystemUser = JSON.parse(user.body);
      this.systemUserList.push(systemUser);
    }
  }


}
