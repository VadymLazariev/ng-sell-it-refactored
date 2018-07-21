import {TestBed, inject} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SessionService} from "./session.service";

import {ApiUrls} from "./api-urls";
import {ProfileService} from "./profile.service";
import {Router} from "@angular/router";
import {ISignUp} from "./models/isign-up";


describe('AuthService', () => {

  let service: AuthService;
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
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([AuthService], (profileService: AuthService) => {
    expect(profileService).toBeTruthy();
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
    service.signUp(registerMock).subscribe(user => {
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
    service.signIn(loginMock).subscribe(user => {
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
    service.verifyEmail(key).subscribe( verification => {
      expect(verification).toEqual(verifyMock);
    });
    const request = httpMock.expectOne(testingUrl);
    expect(request.request.method).toBe('POST');
    request.flush(verifyMock);
  });
});
