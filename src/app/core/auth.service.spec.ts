import {TestBed, inject} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SessionService} from "./session.service";

import {ApiUrls} from "./api-urls";
import {ProfileService} from "./profile.service";
import {Router} from "@angular/router";


describe('AuthService', () => {

  let service: AuthService;
  let sessionService: SessionService;
  let profileService: ProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService,
        SessionService,
        HttpClient,
        ProfileService,
        {
          provide: Router, useValue: jasmine.createSpyObj(
            'Router',
            ['navigate']
          )
        },
      ]
    });
    service = TestBed.get(AuthService);
    sessionService = TestBed.get(SessionService);
    profileService = TestBed.get(ProfileService)
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([AuthService], (authService: AuthService) => {
    expect(authService).toBeTruthy();
  }));

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  it('should signUp new user via POST', function () {
    const registerMock = {
      username: 'jondoe12345678910',
      email: 'jondoe123456@gmail.com',
      password1: 'qwerty1234567',
      password2: 'qwerty1234567',
    };
    const testingUrl = ApiUrls.registration;
    service.signUp(registerMock).subscribe((user: any) => {
      expect(user).toEqual(registerMock);
    });

    const request = httpMock.expectOne(testingUrl);
    expect(request.request.method).toBe('POST');
    request.flush(registerMock);
  });

  it('should login user via POST', function () {
    const loginMock = {
      email: 'vadymlazariev@gmail.com ',
      password: 'qwerty123456',
    };
    const testingUrl = ApiUrls.login;
    service.signIn(loginMock).subscribe((user: any) => {
      expect(user).toEqual(loginMock);
    });

    const request = httpMock.expectOne(testingUrl);
    expect(request.request.method).toBe('POST');
    request.flush(loginMock);
  });

  it('should verify user email via POST', function () {
    const verifyMock = {detail: 'some detail'};
    const key = 'MTM0:1fSPLi:5lZWtxamORdcZiUENdXbUdvJucI';
    const testingUrl = ApiUrls.emailVerify;
    service.verifyEmail(key).subscribe(verification => {
      expect(verification).toEqual(verifyMock);
    });
    const request = httpMock.expectOne(testingUrl);
    expect(request.request.method).toBe('POST');
    request.flush(verifyMock);
  });

  it('should return boolean value if user authorized or not', function () {
    const isAuthenticatedMock = true;
    service.authenticated$.next(isAuthenticatedMock);
    service.isAuthenticated().subscribe((authenticated: boolean) => {
      expect(authenticated).toEqual(isAuthenticatedMock);
    });
  });

  it('should sign out user via GET', () => {
    const testingUrl = ApiUrls.logout;
    const logOutMock = '';
    service.signOut().subscribe(signOut => {
      expect(signOut).toEqual(logOutMock);
    });
    const request = httpMock.expectOne(testingUrl);
    expect(request.request.method).toBe('GET');
    request.flush(logOutMock);
  });

  it('should authenticate user by google login', function () {
    const testingUrl = ApiUrls.authGoogle;
    const authMock = '';
    const fakeToken = "ya29.Gl0BBqymVAGpP9pOgVwdLLaWXYil3L8OzoTABDFqhzTs_4A90wo79SRxkbSZWLVK9DSgrs40cBNI6cfcI2Jg26eE7hxE5dNnjw20xbEC4mhEJhgwqklA7aGmJfzzB8s";
    service.googleAuthentication(fakeToken).subscribe((response: any) => {
      expect(response).toEqual(authMock);
    });
    const request = httpMock.expectOne(testingUrl);
    expect(request.request.method).toBe('POST');
    request.flush(authMock);
  });
});
