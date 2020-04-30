import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {SystemUserLogout} from '../../../store/authorization/authotization.actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private store: Store
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new SystemUserLogout());
  }

}
