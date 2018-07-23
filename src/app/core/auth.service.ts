import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SessionService} from './session.service';
import {ProfileService} from './profile.service';
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Observable} from "rxjs/internal/Observable";
import {ISignUp} from "./models/isign-up";
import {ISignIn} from "./models/isign-in";
import {ApiUrls} from "./api-urls";

@Injectable()
export class AuthService {

  constructor(public sessionService: SessionService,
              private http: HttpClient,
              private router: Router,
              public profileService: ProfileService,
  ) {
  }


  public authenticated$ = new BehaviorSubject<boolean>(this.hasToken());


  signUp(signUpModel: ISignUp): Observable<Object> {
    return this.http.post(ApiUrls.registration, signUpModel);
  }

  signIn(signInModel: ISignIn): Observable<Object> {
    return this.http.post(ApiUrls.login, signInModel).pipe(
      tap((data: any) => {
        if (this.authenticated$ === undefined) {
          this.authenticated$ = new BehaviorSubject<boolean>(this.hasToken());
          this.authenticated$.next(true);
        } else {
          this.authenticated$.next(true);
        }
        this.sessionService.token = data.token;
        this.sessionService.user = data.user;
        this.profileService.profile$.next(data.user);
        this.router.navigate(['/advert']);
      })
    );
  }

  signOut(): Observable<any> {
    return this.http.get(ApiUrls.logout).pipe( tap((response:any) => {
      this.sessionService.removeCookieToken();
      this.sessionService.removeLocalToken();
      this.router.navigate(['/advert']);
      this.authenticated$.next(false);
    }));
  }

  isAuthenticated(): Observable<boolean> {
    this.authenticated$ = new BehaviorSubject<boolean>(this.hasToken());
    return this.authenticated$.asObservable();
  }

  hasToken(): boolean {
    return !!this.sessionService.token;
  }

  verifyEmail(userKey: string): Observable<any> {
    const body = {
      key: userKey
    };
    return this.http.post(ApiUrls.emailVerify, body);
  }

  googleAuthentication(token) : Observable<any> {
    const body = {
      access_token: token,
    };

    return this.http.post(ApiUrls.authGoogle, body).pipe( tap( (data:any)=> {}));
  }

}
