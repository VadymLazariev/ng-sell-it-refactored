import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
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
import {CarouselModule} from "ngx-bootstrap";
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
} from 'angular5-social-login';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('837694048230-keo53o03s8od9ee39boib7o6prp18fs5.apps.googleusercontent.com')
      },
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UiModule,
    CarouselModule.forRoot(),
  ],
  providers: [ProductDataService, SessionService, AuthService, AuthGuard, GuestGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
