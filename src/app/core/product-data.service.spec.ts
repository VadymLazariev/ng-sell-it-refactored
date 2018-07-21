import {TestBed, inject} from '@angular/core/testing';
import {ProductDataService} from './product-data.service';
import {productsMock} from '../../assets/data-mock/products-mock.js'
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SessionService} from "./session.service";
import {Image, Owner, Product} from "./models/product";
import {ApiUrls} from "./api-urls";


describe('Product Data Service', () => {

  let service: ProductDataService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductDataService, SessionService, HttpClient]
    });
    service = TestBed.get(ProductDataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([ProductDataService], (profileService: ProductDataService) => {
    expect(profileService).toBeTruthy();
  }));

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  it(`should retrieve a product data by Id from the API via GET`, () => {
    const fakeId = 181;
    const productMock: Product = {
      pk: 181,
      owner: {
        id: 142,
        username: "my name",
        email: "alkovalzp@ukr.net",
        first_name: "",
        last_name: "",
        avatar: "http://light-it-04.tk/media/avatars/257aa7bb-b5f.png",
        location: null,
        color_scheme: null,
        language: null
      },
      images: [],
      theme: 'new',
      price: 0,
      currency: 1,
      text: null,
      contractPrice: false,
      location: null,
      category: null,
      activated_at: "2018-06-21T15:35:18.527734Z",
      isActive: true,
    };
    service.getProduct(fakeId).subscribe(data => {
      expect(data).toEqual(productMock);
    });
    const request = httpMock.expectOne(ApiUrls.adverts + fakeId + '/');
    expect(request.request.method).toBe('GET');
    request.flush(productMock);
  });

  it(`should retrieve a list of products data by Id from the API via GET`, () => {

  });

});

