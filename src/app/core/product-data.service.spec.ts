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
    const productMock: Product = productsMock.results[0] as Product;
    service.getProduct(productMock.pk).subscribe(product => {
      expect(product).toEqual(productMock);
    });
    const request = httpMock.expectOne(ApiUrls.adverts + productMock.pk + '/');
    expect(request.request.method).toBe('GET');
    request.flush(productMock);
  });


  it(`should retrieve a list of products  from the API via GET`, () => {
    const products = productsMock.results as Product[];
    const offset = 0;
    const limit = 12;
    const testingUrl = `${ApiUrls.adverts}?limit=${limit}&offset=${offset}`;
    service.getProductList(limit,offset).subscribe( productList => {
      expect(productList).toEqual(products);
    });

    const request = httpMock.expectOne(testingUrl);
    expect(request.request.method).toBe('GET');
    request.flush(products);
  });

 it('should create new product via POST ',  ()=> {
    const productMock: Product = productsMock.results[0] as Product;
    const testingUrl = ApiUrls.adverts;
    service.createProduct(productMock,null).subscribe(data=> {
      expect(data).toEqual(productMock);
    })

    const request = httpMock.expectOne(testingUrl);
    expect(request.request.method).toBe('POST');
    request.flush(productMock);
  });
});

