import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Select} from '@ngxs/store';
import {ErrorState} from '../store/error/error.state';
import {ErrorStateMatcher} from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  @Select(ErrorState.getErrors) errors$: Observable<{ [key: string]: string; }>;
  subscription: Subscription;
  errors: { [key: string]: string };

  constructor() {
    this.subscription = this.errors$.subscribe(errors => {
      if (errors) {
        this.errors = errors;
      }
    });
  }

  validateTrue: ErrorStateMatcher = {
    isErrorState: () => {
      return true;
    }
  };

  validateFalse: ErrorStateMatcher = {
    isErrorState: () => {
      return false;
    }
  };

  hasError(field: string): ErrorStateMatcher {
    return this.containsError(field) ? this.validateTrue : this.validateFalse;
  }


  containsError(field: string) {
    return this.errors && this.errors[field];
  }

  errorMessage(field: string) {
    if (this.errors) {
      return this.errors[field];
    }
  }


}
