import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {SessionService} from './session.service';
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Observable} from "rxjs/internal/Observable";
import {Owner} from "./models/product";
import {ApiUrls} from "./api-urls";


@Injectable()
export class ProfileService {

  profile$ = new BehaviorSubject(false);

  constructor(private http: HttpClient, private sessionService: SessionService) {
  }


  get profile(): Observable<Object> {
    return this.profile$.asObservable();
  }

  patch(userModel: Owner): Observable<Response> {
    return this.http.patch(ApiUrls.profile, userModel).pipe(
      tap((data: any) => {
        this.sessionService.user = data;
        this.profile$.next(data);
      }));
  }
}
