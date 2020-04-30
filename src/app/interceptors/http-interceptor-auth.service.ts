import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import {AuthorizationService} from '../authentication-module/service/authorization.service';
import {Store} from '@ngxs/store';
import {SetSystemUser} from '../store/authorization/authotization.actions';
import {SystemUser} from '../model/system-user.model';

@Injectable()
export class HttpInterceptorAuthService implements HttpInterceptor {

  constructor(
    private basicAuthService: AuthorizationService,
    private store: Store
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const basicAuthHeader = this.basicAuthService.getAuthToken();
    const user = this.basicAuthService.getAuthUser();
    if (basicAuthHeader && user) {
      const systemUser: SystemUser = {
        username: user
      };
      this.store.dispatch(new SetSystemUser(systemUser));
      req = req.clone({
        setHeaders: {
          Authorization: basicAuthHeader
        }
      });
    }
    return next.handle(req);
  }


}
