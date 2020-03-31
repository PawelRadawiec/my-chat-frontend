import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat-activator',
  templateUrl: './chat-activator.component.html',
  styleUrls: ['./chat-activator.component.css']
})
export class ChatActivatorComponent implements OnInit {
  activationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.activationForm = this.formBuilder.group(({
      username: ['', Validators.required]
    }));
  }

  activeChat() {
    const username = this.activationForm.value.username;
    if (username) {
      this.router.navigate([`chat/${username}`]);
    }
  }

}
