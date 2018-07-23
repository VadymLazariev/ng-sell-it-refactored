import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient, HttpErrorResponse, HttpHandler} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterLinkWithHref} from '@angular/router';
import {By} from '@angular/platform-browser';
import {productsMock} from '../../assets/data-mock/products-mock.js'
import {AdvertComponent} from './advert.component';
import {ProductDataService} from "../core/product-data.service";
import {HeaderComponent} from "../ui/header/header.component";
import {FooterComponent} from "../ui/footer/footer.component";
import {AdvertItemComponent} from "./advert-item/advert-item.component";
import {ScrollTopComponent} from "../shared/scroll-top-button/scroll-top.component";
import {UserBlockComponent} from "../ui/header/user-block/user-block.component";
import {AuthService} from "../core/auth.service";
import {ProfileService} from "../core/profile.service";
import {SessionService} from "../core/session.service";
import {Product} from "../core/models/product";
import {DebugElement} from "@angular/core";
import {createComponent} from "@angular/compiler/src/core";

describe('AdvertComponent', () => {
  let component: AdvertComponent;
  let fixture: ComponentFixture<AdvertComponent>;
  let httpMock: HttpTestingController;
  let productDataService: ProductDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [
        AdvertComponent,
        HeaderComponent,
        FooterComponent,
        AdvertItemComponent,
        ScrollTopComponent,
        UserBlockComponent,
      ],
      providers: [
        ProductDataService,
        HttpClient,
        HttpHandler,
        AuthService,
        SessionService,
        ProfileService]
    })
      .compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create advert component', () => {
    expect(component).toBeTruthy();
  });

/*  it('should get all data',  () => {
    const products = productsMock.results as Product[];
    expect(component.getProductList);
  });*/
});
