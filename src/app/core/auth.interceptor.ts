import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {SessionService} from "./session.service";
import {Observable} from "rxjs/internal/Observable";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = `JWT ${this.sessionService.token}`;
    if (this.sessionService.token) {
      const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
