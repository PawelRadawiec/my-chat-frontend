import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../service/authorization.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthorizationService) {
  }

  ngOnInit() {
    this.authService.logout();
  }

}
