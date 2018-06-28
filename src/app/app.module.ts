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
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";
import {AuthGuard} from "./core/auth.guard";
import {GuestGuard} from "./core/guest.guard";


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UiModule,

  ],
  providers: [ProductDataService, SessionService,  AuthService, AuthGuard,GuestGuard,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
