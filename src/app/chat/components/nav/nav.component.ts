import {Component, OnInit} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {SystemUser} from '../../../authentication-module/model/system-user.model';
import {AuthorizationState} from '../../../store/authorization/authorization.state';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Select(AuthorizationState.getLoggedUser) loggedUser$: Observable<SystemUser>;

  constructor() {
  }

  ngOnInit() {
  }


}
