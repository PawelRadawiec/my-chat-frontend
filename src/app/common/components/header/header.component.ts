import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthorizationState} from '../../../store/authorization/authorization.state';
import {Select} from '@ngxs/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Select(AuthorizationState.getIsLogged) logged$: Observable<boolean>;

  constructor() { }

  ngOnInit() {
  }

}
