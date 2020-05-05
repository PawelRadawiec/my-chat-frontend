import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Select} from '@ngxs/store';
import {SystemUserState} from '../store/system-user/system-user.state';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  @Select(SystemUserState.getErrorMap) errorMap$: Observable<{ [key: string]: string; }>;
  subscription: Subscription;
  errorMap: { [key: string]: string };

  constructor() {
    this.subscription = this.errorMap$.subscribe(errorMap => {
      if (errorMap) {
        this.errorMap = errorMap;
      }
    });
  }

  containsError(field: string) {
    return this.errorMap && this.errorMap[field];
  }

  errorMessage(field: string) {
    if (this.errorMap) {
      return this.errorMap[field];
    }
  }


}
