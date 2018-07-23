import {TestBed, inject} from '@angular/core/testing';
import {SessionService} from './session.service';
import {CookieService} from 'ngx-cookie';
import {Owner} from "./models/product";

describe('SessionService', () => {

  let service: SessionService;
  let cookie: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const cookieSpy = jasmine.createSpyObj('CookieService', ['get', 'remove', 'put']);
    TestBed.configureTestingModule({
      providers: [SessionService, {provide: CookieService, useValue: cookieSpy}]
    });

    service = TestBed.get(SessionService);
    cookie = TestBed.get(CookieService);
  });

  it('should be created', inject([SessionService], (sessionService: SessionService) => {
    expect(sessionService).toBeTruthy();
  }));

  it('should have a service instance', inject([SessionService], (sessionService: SessionService) => {
    expect(sessionService).toBeDefined();
  }));

  it('should get cookie token', function () {
    const fakeToken = null;
    cookie.get.and.returnValue(fakeToken);
    const token = service.token;
    expect(token).toBe(fakeToken);
  });

  it('should set cookie token', function () {
    const fakeToken = null;
    cookie.put(fakeToken);
    const token = service.token;
    expect(token).toBe(fakeToken);
  });

  it('should get user from localStorage ', function () {
    const fakeToken = null;
    const userMock: Owner = {
      id: 142,
      username: "my name",
      email: "alkovalzp@ukr.net",
      first_name: "",
      last_name: "",
      avatar: "http://light-it-04.tk/media/avatars/257aa7bb-b5f.png",
      location: null,
      color_scheme: null,
      language: null
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(userMock));
    expect(service.user).toEqual(userMock);
  });

  it('should set user to localStorage ', function () {
    const userMock: Owner = {
      id: 142,
      username: "my name",
      email: "alkovalzp@ukr.net",
      first_name: "",
      last_name: "",
      avatar: "http://light-it-04.tk/media/avatars/257aa7bb-b5f.png",
      location: null,
      color_scheme: null,
      language: null
    };
    spyOn(localStorage, 'setItem');
    expect(service.user).toEqual(userMock);
  });

});
