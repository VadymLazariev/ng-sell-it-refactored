import {TestBed, inject} from '@angular/core/testing';
import {ProfileService} from './profile.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SessionService} from "./session.service";
import {Owner} from "./models/product";
import {ApiUrls} from "./api-urls";


describe('ProfileService', () => {

  let service: ProfileService;
  let sessionService: SessionService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService, SessionService, HttpClient]
    });
    service = TestBed.get(ProfileService);
    sessionService = TestBed.get(SessionService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([ProfileService], (profileService: ProfileService) => {
    expect(profileService).toBeTruthy();
  }));

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  it('getter should return profile Observable', () => {
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

    service.profile$.next(userMock);

    service.profile.subscribe((owner:Owner) => {
      expect(owner).toEqual(userMock);
    })
  });

  it('should update user via PATCH', () => {
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
    const testingUrl = ApiUrls.profile;
    service.patch(userMock).subscribe(user => {
      expect(user).toEqual(userMock);
    });
    const request = httpMock.expectOne(testingUrl);
    expect(request.request.method).toBe('PATCH');
    request.flush(userMock);
  });
});
