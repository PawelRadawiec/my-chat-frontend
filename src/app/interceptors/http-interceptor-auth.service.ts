import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import {AuthorizationService} from '../service/authorization.service';

@Injectable()
export class HttpInterceptorAuthService implements HttpInterceptor {

  constructor(private basicAuthService: AuthorizationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const basicAuthHeader = this.basicAuthService.getAuthToken();
    const user = this.basicAuthService.getAuthUser();
    if (basicAuthHeader && user) {
      req = req.clone({
        setHeaders: {
          Authorization: basicAuthHeader
        }
      });
    }
    return next.handle(req);
  }


}
