import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from './session.service';
import {ProfileService} from './profile.service';
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Observable} from "rxjs/internal/Observable";
import {ISignUp} from "./models/isign-up";
import {ISignIn} from "./models/isign-in";
import {Subscription} from "rxjs/internal/Subscription";
import {ApiUrls} from "./api-urls";

@Injectable()
export class AuthService {

  constructor(public sessionService: SessionService,
              private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              public profileService: ProfileService,
  ) {}


  public authenticated$ = new BehaviorSubject<boolean>(this.hasToken());

  signUp(signUpModel: ISignUp): Observable<Object> {
    return this.http.post(ApiUrls.registration, signUpModel);
  }

  signIn(signInModel: ISignIn): Observable<Object> {
    return this.http.post(ApiUrls.login, signInModel).pipe(
      tap( (data: any) => {
        if ( this.authenticated$ === undefined) {
          this.authenticated$ = new BehaviorSubject<boolean>(this.hasToken());
          this.authenticated$.next(true);
        } else {
          this.authenticated$.next(true);
        }
        this.sessionService.token = data.token;
        this.sessionService.user = data.user;
        this.profileService.profile$.next(data.user);
        this.router.navigate(['/advert']);
      } )
    );
  }

  signOut(): Subscription {
    return this.http.get(ApiUrls.logout).subscribe( () => {
      Cookie.delete('token');
      Cookie.delete('user');
      this.router.navigate(['/advert']);
      this.authenticated$.next(false);
    });
  }

  isAuthenticated(): Observable<boolean> {
    this.authenticated$ = new BehaviorSubject<boolean>(this.hasToken());
    return this.authenticated$.asObservable();
  }

  hasToken(): boolean {
    return !!this.sessionService.token;
  }

  verifyEmail(userKey: string): Observable<Object>  {
    const body = {
      key: userKey
    };
    return this.http.post(ApiUrls.emailVerify, body);
  }

  googleAuthentication( token) {
    const body = {
      access_token: token,
    };

    return this.http.post(ApiUrls.authGoogle, body );
  }

}
