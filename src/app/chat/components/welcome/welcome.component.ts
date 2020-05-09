import {Component, Input, OnInit} from '@angular/core';
import {SystemUser} from '../../../authentication-module/model/system-user.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  @Input() user: SystemUser;

  constructor() {
  }

  ngOnInit() {
  }

}
