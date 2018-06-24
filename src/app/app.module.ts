import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UiModule} from "./ui/ui.module";
import {ProductDataService} from "./core/product-data.service";
import {AuthInterceptor} from "./core/auth.interceptor";
import {SessionService} from "./core/session.service";
import {AuthService} from "./core/auth.service";
import { AddProductComponent } from './add-product/add-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorHandlerComponent } from './shared/error-handler/error-handler.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UiModule
  ],
  providers: [ProductDataService, SessionService,  AuthService,   {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
