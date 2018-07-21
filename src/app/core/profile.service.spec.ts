import {TestBed, inject} from '@angular/core/testing';
import {ProfileService} from './profile.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SessionService} from "./session.service";
import {Owner} from "./models/product";


describe('ProfileService', () => {

  let service: ProfileService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService, SessionService, HttpClient]
    });
    service = TestBed.get(ProfileService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([ProfileService], (profileService: ProfileService) => {
    expect(profileService).toBeTruthy();
  }));

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  it('should update user with PATCH method', () => {
        const userMock : Owner = {
          id: 1,
          username: 'JohnDoe' ,
          email: 'johndoe@gmail.com',
          first_name: 'Jon',
          last_name: 'Doe',
          avatar: 'qwerty.jpg',
          location: '',
          color_scheme: "#321254",
          language: "en"
        };

        service.patch(userMock);
  });
});
