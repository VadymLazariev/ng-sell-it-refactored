import {TestBed, inject} from '@angular/core/testing';
import {SessionService} from './session.service';


describe('SessionService', () => {

  let service = SessionService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionService]
    });
  });

 it('should be created', inject([SessionService], (sessionService: SessionService) => {
    expect(sessionService).toBeTruthy();
  }));

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

});
