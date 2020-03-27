import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChatMessage} from './model/chat-message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messageForm: FormGroup;
  userForm: FormGroup;
  messages: ChatMessage[] = [];

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.messageForm = this.formBuilder.group({
      message: [Validators.required]
    });
    this.userForm = this.formBuilder.group(({
      username: [Validators.required]
    }));
  }


}
