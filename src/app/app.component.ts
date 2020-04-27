import {Component} from '@angular/core';
import {Select} from '@ngxs/store';
import {AuthorizationState} from './store/authorization/authorization.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @Select(AuthorizationState.getIsLogged) logged$: Observable<boolean>;

}
